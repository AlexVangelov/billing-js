// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStoreRecord, IStoreConfig } from './interface';
import { MemoryStore } from './memoryStore';
import { IStore } from './interface';

export declare type ArrayOrStoreConfig = Array<IStoreRecord> | IStoreConfig;

export interface IStorableClass<T extends Storable> {
  _store :IStore;
  new (...a: any[]): T
}

export abstract class Storable {
  static _store :IStore;

  constructor(attributes :any = {}) {
    if (attributes.store) (<any>this.constructor).initStore(attributes.store); 
  }

  static find<T extends Storable>(this: IStorableClass<T>, id: number) :T {
    let record = this._store.get(id);
    if (record) return new this(record);
  }

  static all<T extends Storable>(this: IStorableClass<T>) :Array<IStoreRecord> {
    let records = this._store.query();
    return records.map((record) => {
      return new this(record);
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