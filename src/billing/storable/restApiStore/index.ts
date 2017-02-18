// Copyright (c) 2017 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStore, IStoreRecord } from '../interface';

export class Store implements IStore {
  private _items :Array<IStoreRecord> = [];
  private docClient :any;

  constructor() {
  }

  findById(id: number, callback: any) {
    for (let i of this._items) {
      if (i.id === id) {
        return callback(undefined, i);
      }
    }
    return callback(new Error('Not Found'));
  }

  findOne(conditions: any, callback: any) {
    if (this._items.length > 0) return callback(undefined, this._items[0]);
    else return callback(new Error('Not Found'));
  }

  find(conditions :any, callback :any) {
    return callback(undefined, this._items);
  }
}
