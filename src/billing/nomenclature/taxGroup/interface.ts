import { IStoreRecord, IStoreConfig } from '../../storable/interface';

export declare type TTaxGroupConfig = Array<ITaxGroup> | IStoreConfig;

export interface ITaxGroup extends IStoreRecord {
  id ?:number;
  code :string;
  name :string;
  percentRatio :number;
}