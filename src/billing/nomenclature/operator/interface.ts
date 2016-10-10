import { IStoreRecord, IStoreConfig } from '../../store/interface';

export declare type TOperatorsConfig = Array<IOperator> | IStoreConfig;

export interface IOperator extends IStoreRecord {
  id ?:number;
  code :string;
  name :string;
}