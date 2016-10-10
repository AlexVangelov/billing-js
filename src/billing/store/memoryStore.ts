import { IStore, IStoreRecord } from './interface';

export class MemoryStore implements IStore {
  private _items = [];

  constructor(items :Array<IStoreRecord>) {
    this._items = items;
  }

  get(id :number) {
    return {};
  }

  query(filter :any) {
    return this._items;
  }
}