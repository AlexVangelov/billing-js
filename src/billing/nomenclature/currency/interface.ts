import { IStoreRecord, IStoreConfig } from '../../store/interface';

export declare type TCurrencyConfig = Array<ICurrency> | IStoreConfig;

export interface ICurrency extends IStoreRecord {
  id ?:number;
  name :string;
  rate :number;
}