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

  initCollection(collectionName :string, items :Array<IStoreRecord> = []) {
    this._db[collectionName] = items;
  }

  findById(collectionName: string, id: number, callback: any) {
    if (this._db[collectionName]) {
      for (let i of this._db[collectionName]) {
        if (i.id === id) {
          return callback(undefined, i);
        }
      }
      return callback(new Error('Not Found'));
    } else return callback(new Error(`Collection ${collectionName} is not initialized`));
  }

  // findOne(conditions: any, callback: any) {
  //   if (this._items.length > 0) return callback(undefined, this._items[0]);
  //   else return callback(new Error('Not Found'));
  // }

  // find(conditions :any, callback :any) {
  //   return callback(undefined, this._items);
  // }
}