// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStoreRecord, IStoreConfig } from './interface';
import { MemoryStore } from './memoryStore';
// import { DynamoDbStore } from './dynamoDbStore';
import { IStore } from './interface';

export declare type ArrayOrStoreConfig = Array<IStoreRecord> | IStoreConfig;

export interface IStorableClass<T extends Storable> {
  _store :IStore;
  new (...a: any[]): T
}

export class StoreCatchable {
  _catchCallback :(err: any)=> any;
  catch(catchCallback :(err: any)=> any) {
    this._catchCallback = catchCallback;
  };
  throwAsync(err :any) {
    setTimeout(()=> {
      if (this._catchCallback) this._catchCallback(err);
      else throw err;
    }, 0);
  }
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

  static find<T extends Storable>(this: IStorableClass<T>, id: number, callback :(item: T) => any) :StoreCatchable {
    let catchable = new StoreCatchable();
    let className = (<any>this).name;
    if (!this._store) {
      catchable.throwAsync(new Error(`${className} store is not configured!`));
    } else {
      this._store.findById(className, id, (err, record)=> {
        if (err) catchable.throwAsync(err);
        else if (!record) catchable.throwAsync(new Error('Not Found'));
        else callback(new this(record));
      });
    }
    return catchable;
  }

  // static findOne<T extends Storable>(this: IStorableClass<T>, conditions: any, callback :(item: T) => any) :StoreCatchable {
  //   let catchable = new StoreCatchable();
  //   if (!this._store) {
  //     let className = (<any>this).name;
  //     catchable.throwAsync(new Error(`${className} store is not configured!`));
  //   } else {
  //     this._store.findOne(conditions, (err, record)=> {
  //       if (err) catchable.throwAsync(err);
  //       else if (!record) catchable.throwAsync(new Error('Not Found'));
  //       else callback(new this(record));
  //     });
  //   }
  //   return catchable;
  // }

  // static all<T extends Storable>(this: IStorableClass<T>, callback: (item: Array<T>) => any) :StoreCatchable {
  //   let catchable = new StoreCatchable();
  //   if (!this._store) {
  //     let className = (<any>this).name;
  //     catchable.throwAsync(new Error(`${className} store is not configured!`));
  //   } else {
  //     this._store.find({}, (err, records)=> {
  //       if (err) {
  //         catchable.throwAsync(err);
  //       } else callback(records.map((record)=> {
  //         return new this(record);
  //       }));
  //     });
  //   }
  //   return catchable;
  // }

  static initStore<T extends Storable>(this: IStorableClass<T>, items ?:ArrayOrStoreConfig, store ?:IStore) {
    this._store = store || new MemoryStore();
    if (items instanceof Array) {
      let className = (<any>this).name;
      this._store.initCollection(className, items);
    }
  }
}

export {
  MemoryStore,
  // DynamoDbStore
}