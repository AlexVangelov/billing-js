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

  get(id :number) {
    for (let i of this._items) {
      if (i.id === id) return i;
    }
  }

  query(filter :any) {
    return this._items;
  }
}