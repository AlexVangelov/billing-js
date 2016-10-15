export interface IStoreRecord {
  id ?:number;
}

export interface IStoreConfig {
  store :string;
}

export interface IStore {
  get(id :number) :IStoreRecord;
  query(filter ?:any) :Array<IStoreRecord>;
}
