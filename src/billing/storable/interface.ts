export interface IStoreRecord {
  id ?:number;
}

export interface IStoreConfig {
  store :string;
}

export interface IStore {
  initCollection(collectionName :string, items ?:Array<IStoreRecord>, callback ?:Function) :any;
  findById(collectionName, id :number, callback ?:any) :any;
  save(collectionName :string, record: any, callback ?:Function) :any;
  //find(conditions :any, callback :any);
  // findOne(conditions :any, callback :any);
}
