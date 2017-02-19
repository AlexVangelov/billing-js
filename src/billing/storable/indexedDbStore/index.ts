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
  collectionName: string;

  constructor(dbName :string = 'BillingJs') {
    this.dbName = dbName;
    this.IndxDb = window.indexedDB || window['mozIndexedDB'] || window['webkitIndexedDB'] || window['msIndexedDB'];
  }

  initCollection(collectionName: string) {
    let self = this;
    this.collectionName = collectionName;
    return new Promise((resolve, reject) => {
      let req: IDBOpenDBRequest;
      req = this.IndxDb.open(this.dbName);
      req.onupgradeneeded = (ev: any)=> {
        self.db = ev.target.result;
        self.initTable();
      }
      req.onsuccess = (ev: any)=> {
        self.db = ev.target.result;
        resolve(self.db);
      }
      req.onerror = (ev: any)=> {
        reject(ev.error);
      }
    });
  }

  reset() {
    this.db.close();
    this.IndxDb.deleteDatabase(this.dbName);
    return this.initCollection(this.collectionName);
  }

  initTable(): any {
    switch(this.collectionName) {
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
        this.db.createObjectStore(this.collectionName, { keyPath: "id", autoIncrement: true });
    }
  }

  findById(id :number, callback ?:any) :any {
    return callback(new Error('Not Found'));
  }

  findById_(id: number) :Promise<IStoreRecord> {
    return new Promise((resolve, reject) => {
      let tx = this.db.transaction([this.collectionName]);
      let store = tx.objectStore(this.collectionName);
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

  save(record: any) :Promise<any> {
    return new Promise((resolve, reject) => {
      let tx = this.db.transaction([this.collectionName], "readwrite");
      let store = tx.objectStore(this.collectionName);
      if (!record.id) {
        let request = store.add(record);
        request.onerror = ()=> reject(request.error);
        request.onsuccess = ()=> {
          record.id = request.result; 
          resolve(record);
        }
      } else {
        let getRequest = store.get(record.id);
        getRequest.onerror = ()=> reject(getRequest.error);
        getRequest.onsuccess = ()=> {
          let existing = getRequest.result;
          if (!existing) reject(new Error('Not Found'));
          else {
            for (let p in record) existing[p] = record[p];
            let updateRequest = store.put(existing);
            updateRequest.onerror = ()=> reject(updateRequest.error);
            updateRequest.onsuccess = (ev: any)=> {
              resolve(existing);
            }
          } 
        };
      }
    });
  }
}
