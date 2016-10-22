// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStore, IStoreRecord } from './interface';

export class MemoryStore implements IStore {
  private _items :Array<IStoreRecord> = [];

  constructor(items :Array<IStoreRecord>) {
    this._items = items;
  }

  findById(id: number, callback: any) {
    for (let i of this._items) {
      if (i.id === id) {
        return callback(undefined, i);
      }
    }
    return callback({ error: 'not_found' });
  }

  find(conditions :any, callback :any) {
    return callback(undefined, this._items);
  }
}