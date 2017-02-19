export interface IStoreRecord {
  id ?:number;
}

export interface IStoreConfig {
  store :string;
}

export interface IStore {
  findById(id :number, callback :any);
  find(conditions :any, callback :any);
  // findOne(conditions :any, callback :any);
}
