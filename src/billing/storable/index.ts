// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStoreRecord, IStoreConfig } from './interface';
import { MemoryStore } from './memoryStore';
// import { DynamoDbStore } from './dynamoDbStore';
import { IStore } from './interface';

import { Catchable } from '../../utils/catchable';

export declare type ArrayOrStoreConfig = Array<any> | IStoreConfig;

export interface IStorableClass<T extends Storable> {
  _store :IStore;
  new (...a: any[]): T;
}

export interface IStorableHooks {
  afterInitialize?(callback :Function) :any;
}

export abstract class Storable implements IStorableHooks {
  static _store :IStore;
  private _queueSize :number = 0;
  private _reposeCallback;
  id :any;

  constructor(attributes :any = {}) {
    this.id = attributes.id;
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

  static find<T extends Storable>(this: IStorableClass<T>, conditions: any, callback :Function) :Catchable {
    let catchable = new Catchable();
    let className = (<any>this).name;
    if (!this._store) {
      catchable.throwAsync(new Error(`${className} store is not configured (find)!`));
    } else {
      if (conditions instanceof Object) {
        let models = [];
        this._store.find(className, conditions, {}, (err, records)=> {
          if (err) catchable.throwAsync(err);
          else {
            for(let i in records) {
              models.push(new this(records[i]));
            }
            callback(models);
          }
        });
      } else {
        this._store.findById(className, conditions, (err, record)=> {
          if (err) catchable.throwAsync(err);
          else if (!record) catchable.throwAsync(new Error(`Not Found (${className}#${conditions})`));
          else {
            let model = new this(record);
            if (model['afterInitialize']) model['afterInitialize'](callback);
            else callback(model);
          }
        });
      }
    }
    return catchable;
  }

  static save<T extends Storable>(this: IStorableClass<T>, item: IStoreRecord, callback :(item: IStoreRecord) => any) {
    let catchable = new Catchable();
    let className = (<any>this).name;
    if (!this._store) {
      catchable.throwAsync(new Error(`${className} store is not configured (save)!`));
    } else {
      this._store.save(className, item, (err, record)=> {
        if (err) catchable.throwAsync(err);
        else if (!record) catchable.throwAsync(new Error(`Not Found ()`));
        else {
          for (let p in record) item[p] = record[p];
          if (callback) callback(item);
        }
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

  static initStore<T extends Storable>(this: IStorableClass<T>, items ?:ArrayOrStoreConfig, store ?:IStore, callback ?:Function) {
    let className = (<any>this).name;
    this._store = store || new MemoryStore();
    // if (items instanceof Array) {
    //   this._store.initCollection(className, items);
    // } else {
    //   this._store.initCollection(className);
    // }
    this._store.initCollection(className, (items instanceof Array) ? items : null, callback);
  }
}

export {
  MemoryStore,
  // DynamoDbStore
}