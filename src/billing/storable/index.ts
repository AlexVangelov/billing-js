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
  private _queueSize :number = 0;
  private _reposeCallback;

  constructor(attributes :any = {}) {
    if (attributes.store) (<any>this.constructor).initStore(attributes.store); 
  }

  incQueue() {
    this._queueSize = this._queueSize + 1;
  }
  decQueue() {
    this._queueSize = this._queueSize - 1;
    if (!this._queueSize && this._reposeCallback) this._reposeCallback();
  }

  repose(reposeCallback :() => any) {
    if (!this._queueSize) reposeCallback();
    else this._reposeCallback = reposeCallback;
  }

  static find<T extends Storable>(this: IStorableClass<T>, id: number, callback :(item: T) => any) :T {
    if (!this._store) return;
    this._store.findById(id, (err, record)=> {
      if (err) {
        console.error(err);
        callback(undefined);
      } else callback(new this(record));
    });
  }

  static all<T extends Storable>(this: IStorableClass<T>, callback: (item: Array<T>) => any) :Array<T> {
    if (!this._store) return;
    let records :Array<T> = [];
    this._store.find({}, (err, records)=> {
      if (err) {
        console.error(err);
        callback(undefined);
      } else callback(records.map((record)=> {
        return new this(record);
      }));
    });
  }

  static initStore(config :ArrayOrStoreConfig | any) {
    if (config instanceof Array) {
      this._store = new MemoryStore(config);
    } else this._store = config;
  }
}

export {
  MemoryStore
}