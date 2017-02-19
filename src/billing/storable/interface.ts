export interface IStoreRecord {
  id ?:number;
}

export interface IStoreConfig {
  store :string;
}

export interface IStore {
  initCollection(collectionName :string, items ?:Array<IStoreRecord>)
  findById(collectionName, id :number, callback ?:any) :any;
  //find(conditions :any, callback :any);
  // findOne(conditions :any, callback :any);
}
