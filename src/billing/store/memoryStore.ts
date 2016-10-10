import { IStore, IStoreRecord } from './interface';

export class MemoryStore implements IStore {
  private _items = [];

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