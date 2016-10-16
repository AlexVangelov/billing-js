import { IStoreRecord, IStoreConfig } from '../../storable/interface';

export declare type TOperatorsConfig = Array<IOperator> | IStoreConfig;

export interface IOperator extends IStoreRecord {
  id :number;
  code :string;
  name :string;
}