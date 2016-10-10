import { IStoreRecord, IStoreConfig } from './interface';
import { MemoryStore } from './memoryStore';

export declare type ArrayOrStoreConfig = Array<IStoreRecord> | IStoreConfig;

export module Store {
  export function init(config :ArrayOrStoreConfig) {
    if (config instanceof Array) {
      return new MemoryStore(config);
    }
  }
}

export {
  MemoryStore
}