// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStore, IStoreRecord } from './interface';

export class MemoryStore implements IStore {
  private _db :{ [collectionName :string] :Array<IStoreRecord> } = {};

  constructor() {
    //this._items = items;
  }

  initCollection(collectionName :string, items :Array<IStoreRecord> = [], callback ?:Function) {
    this._db[collectionName] = items;
    if (callback) callback(null, this._db);
  }

  findById(collectionName: string, id: string, callback: any) {
    if (this._db[collectionName]) {
      for (let i of this._db[collectionName]) {
        if (i.id === id) {
          return callback(undefined, i);
        }
      }
      return callback(new Error(`Not Found (${collectionName}#${id})`));
    } else return callback(new Error(`Collection ${collectionName} is not initialized`));
  }

  // findOne(conditions: any, callback: any) {
  //   if (this._items.length > 0) return callback(undefined, this._items[0]);
  //   else return callback(new Error('Not Found'));
  // }

  find(collectionName :string, conditions :any, options :any, callback ?:Function) :Array<IStoreRecord> {
    let records = [];
    this._db[collectionName].forEach((r)=> records.push(r));
    return callback(undefined, records);
  }

  save(collectionName :string, record: any, callback ?:Function) {

  }
}