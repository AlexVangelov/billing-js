import { IStoreRecord, IStoreConfig } from '../../store/interface';

export declare type TDepartmentConfig = Array<IDepartment> | IStoreConfig;

import { TaxGroup } from '../taxGroup';

export interface IDepartment extends IStoreRecord {
  id ?:number;
  code :string;
  name :string;
  taxGroup :TaxGroup;
}