// Copyright (c) 2017 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Promise } from 'es6-promise';
import { IStore, IStoreRecord } from '../interface';

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
    let req = this.IndxDb.open(this.dbName);
    req.onupgradeneeded = (ev: any)=> {
      self.db = ev.target.result;
      self.db.createObjectStore('Bill', { keyPath: "id", autoIncrement: true });
      self.db.createObjectStore('Charge', { keyPath: "id", autoIncrement: true });
      self.db.createObjectStore('Modifier', { keyPath: "id", autoIncrement: true });
      self.db.createObjectStore('Payment', { keyPath: "id", autoIncrement: true });
    }
    req.onsuccess = (ev: any)=> {
      self.db = ev.target.result;
      callback(null, self.db);
    }
    req.onerror = (ev: any)=> {
      callback(ev.error);
    }
  }

  initCollection(collectionName: string, items :Array<IStoreRecord> = [], callback ?:Function) {
    let self = this;
    this._getDb((err)=> {
      if (err) return callback(err);
      callback(null, this.db);
    })
  }

  reset(callback ?:Function) {
    this._getDb((err)=> {
      this.db.close();
      this.IndxDb.deleteDatabase(this.dbName);
      if (callback) callback();
    });
  }

  initTable(collectionName): any {
    switch(collectionName) {
      case 'bills': {
        this.db.createObjectStore('bills', { keyPath: "id", autoIncrement: true });
        break;
      }
      case 'charges': {
        this.db.createObjectStore('charges', { keyPath: "id", autoIncrement: true });
        break;
      }
      case 'modifiers': {
        this.db.createObjectStore('modifiers', { keyPath: "id", autoIncrement: true });
        break;
      }
      case 'payments': {
        this.db.createObjectStore('payments', { keyPath: "id", autoIncrement: true });
        break;
      }
      default:
        this.db.createObjectStore(collectionName, { keyPath: "id", autoIncrement: true });
    }
  }

  findById(collectionName :string, id :number, callback :Function) :any {
    let tx = this.db.transaction([collectionName]);
    let store = tx.objectStore(collectionName);
    let request = store.get(id);
    request.onerror = ()=> {
      callback(request.error);
    };
    request.onsuccess = ()=> {
      if (!request.result) callback(new Error('Not Found'));
      else callback(null, request.result);
    };
  }

  findById_(collectionName :string, id: number) :Promise<IStoreRecord> {
    return new Promise((resolve, reject) => {
      let tx = this.db.transaction([collectionName]);
      let store = tx.objectStore(collectionName);
      let request = store.get(id);
      request.onerror = ()=> {
        reject(request.error);
      };
      request.onsuccess = ()=> {
        if (!request.result) reject(new Error('Not Found'));
        else resolve(request.result);
      };
    });
  }

  // findOne(conditions: any, callback: any) {
  //   if (this._items.length > 0) return callback(undefined, this._items[0]);
  //   else return callback(new Error('Not Found'));
  // }

  find(conditions :any, callback :any) {
    return callback(undefined, []);
  }

  save(collectionName :string, record: any, callback ?:Function) {
    let tx = this.db.transaction([collectionName], "readwrite");
    let store = tx.objectStore(collectionName);
    if (!record.id) {
      let request = store.add(record);
      request.onerror = ()=> callback(request.error);
      request.onsuccess = ()=> {
        record.id = request.result; 
        callback(null, record);
      }
    } else {
      let getRequest = store.get(record.id);
      getRequest.onerror = ()=> callback(getRequest.error);
      getRequest.onsuccess = ()=> {
        let existing = getRequest.result;
        if (!existing) callback(new Error('Not Found'));
        else {
          for (let p in record) existing[p] = record[p];
          let updateRequest = store.put(existing);
          updateRequest.onerror = ()=> callback(updateRequest.error);
          updateRequest.onsuccess = (ev: any)=> {
            callback(null, existing);
          }
        } 
      };
    }
  }
}
