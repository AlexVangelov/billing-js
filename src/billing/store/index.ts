import { IStoreRecord, IStoreConfig } from './interface';
import { MemoryStore } from './memoryStore';
import { IStore } from './interface';

export declare type ArrayOrStoreConfig = Array<IStoreRecord> | IStoreConfig;

export abstract class Store {
  protected static _store :IStore;

  static find(id: number) :IStoreRecord {
    return this._store.get(1);
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