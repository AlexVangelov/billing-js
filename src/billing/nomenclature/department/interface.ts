import { IStoreRecord, IStoreConfig } from '../../storable/interface';

export declare type TDepartmentConfig = Array<IDepartment> | IStoreConfig;

export interface IDepartment extends IStoreRecord {
  id ?:number;
  code :string;
  name :string;
  taxGroupId :number;
}