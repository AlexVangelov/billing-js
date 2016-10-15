// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStoreRecord, IStoreConfig } from './interface';
import { MemoryStore } from './memoryStore';
import { IStore } from './interface';

export declare type ArrayOrStoreConfig = Array<IStoreRecord> | IStoreConfig;

export class Storable<T> {
  protected static _store :IStore;

  constructor(attributes :any = {}) {
    if (attributes.store) (<any>this.constructor).initStore(attributes.store); 
  }

  static find(id: number) :IStoreRecord {
    let record = this._store.get(id);
    if (record) return new this(record);
  }

  static all() :Array<IStoreRecord> {
    let records = this._store.query();
    let self = this;
    return records.map(function(record) {
      return new self(record);
    });
  }

  static initStore(config :ArrayOrStoreConfig) {
    if (config instanceof Array) {
      this._store = new MemoryStore(config);
    }
  }
}

export {
  MemoryStore
}