// Copyright (c) 2017 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStore, IStoreRecord } from '../../../billing/storable/interface';

export class Store implements IStore {
  private _items: Array<IStoreRecord> = [];
  IndxDb: IDBFactory;
  db: IDBDatabase;
  dbName: string;

  constructor(dbName :string = 'BillingJs') {
    this.dbName = dbName;
    this.IndxDb = window.indexedDB || window['mozIndexedDB'] || window['webkitIndexedDB'] || window['msIndexedDB'];
  }

  _getDb(callback :Function) {
    let self = this;
    if (this.db) return callback(null, this.db);
    let req = this.IndxDb.open(this.dbName);
    req.onupgradeneeded = (ev: any)=> {
      self.db = ev.target.result;
      let objectStore = self.db.createObjectStore('Bill', { keyPath: "id", autoIncrement: true });
      
      objectStore = self.db.createObjectStore('Charge', { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("billIdIndex", "billId", { unique: false });

      objectStore = self.db.createObjectStore('Modifier', { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("billIdIndex", "billId", { unique: false });
      objectStore.createIndex("billIdchargeIdIndex", ["billId", "chargeId"], { unique: true });

      objectStore = self.db.createObjectStore('Payment', { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("billIdIndex", "billId", { unique: false });
    }
    if (callback) req.onsuccess = (ev: any)=> {
      self.db = ev.target.result;
      callback(null, self.db);
    };
    req.onerror = (ev: any)=> {
      if (callback) callback(ev.error);
    };
  }

  initCollection(collectionName: string, items :Array<IStoreRecord> = [], callback :Function) {
    let self = this;
    this._getDb((err)=> {
      if (err && callback) return callback(err);
      if (callback) callback(null, self.db);
    })
  }

  reset(callback :Function) {
    this._getDb((err)=> {
      if (err) return callback(err);
      this.db.close();
      this.IndxDb.deleteDatabase(this.dbName);
      delete this.db;
      this._getDb(callback);
    });
  }

  findById(collectionName :string, id :number | string, callback :Function) :any {
    let tx = this.db.transaction([collectionName]);
    let store = tx.objectStore(collectionName);
    let request = store.get(id);
    if (callback) request.onerror = ()=> {
      callback(request.error);
    };
    request.onsuccess = ()=> {
      if (!request.result) callback(new Error('Not Found'));
      else if (callback) callback(null, request.result);
    };
  }

  findOne(collectionName :string, conditions :any, options :any, callback ?:Function) :any {
    let tx = this.db.transaction([collectionName]);
    let store = tx.objectStore(collectionName);
    let conditionsKeys = Object.keys(conditions);
    let idx :IDBIndex;
    let req :IDBRequest;
    if (conditionsKeys.length > 1) {
      let vals = [];
      conditionsKeys.forEach((key)=> vals.push(conditions[key]));
      idx = store.index(`${conditionsKeys.join('')}Index`);
      req = idx.get(vals);
    } else {
      idx = store.index(`${conditionsKeys[0]}Index`);
      req = idx.get(conditions[conditionsKeys[0]]);
    }
    if (callback) req.onerror = ()=> {
      callback(req.error);
    };
    req.onsuccess = (ev :any)=> {
      if (!ev.target.result) callback(new Error('Not Found'));
      else if (callback) callback(null, ev.target.result);
    };
  }

  find(collectionName :string, conditions :any, options :any, callback ?:Function) :Array<IStoreRecord> {
    let tx = this.db.transaction([collectionName]);
    let store = tx.objectStore(collectionName);
    let conditionsKeys = Object.keys(conditions);
    if (conditionsKeys.length > 1) return callback(new Error('Multiple conditions not implemented'));
    let idx = store.index(`${conditionsKeys[0]}Index`);
    let req = idx.openCursor(conditions[conditionsKeys[0]]);
    req.onerror = ()=> {
      if (callback) callback(req.error);
    };
    let items = [];
    req.onsuccess = (ev :any)=> {
      let cursor = ev.target.result;
      if (cursor) {
        items.push(cursor.value);
        cursor.continue();
      } else if (callback) callback(null, items);
    };
  }

  save(collectionName :string, model: any, callback ?:Function) {
    let tx = this.db.transaction([collectionName], "readwrite");
    let store = tx.objectStore(collectionName);
    let record = model.toJson(true, false);
    if (!record.id) {
      let request = store.add(record);
      if (callback) request.onerror = ()=> callback(request.error);
      request.onsuccess = ()=> {
        record.id = request.result;
        if (callback) callback(null, record);
      }
    } else {
      let getRequest = store.get(record.id);
      if (callback) getRequest.onerror = ()=> callback(getRequest.error);
      getRequest.onsuccess = ()=> {
        let existing = getRequest.result;
        if (!existing) callback(new Error('Not Found'));
        else {
          for (let p in record) existing[p] = record[p];
          let updateRequest = store.put(existing);
          updateRequest.onerror = ()=> callback(updateRequest.error);
          updateRequest.onsuccess = (ev: any)=> {
            if (callback) callback(null, existing);
          }
        } 
      };
    }
  }

}
