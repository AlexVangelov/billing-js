import { IStoreRecord, IStoreConfig } from '../../store/interface';

export declare type TPaymentTypeConfig = Array<IPaymentType> | IStoreConfig;

export interface IPaymentType extends IStoreRecord {
  id ?:number;
  code :string;
  name :string;
  isCash :boolean;
  isFiscal :boolean;
}