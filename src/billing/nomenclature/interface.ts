import { TOperatorsConfig } from './operator/interface';
import { TTaxGroupConfig } from './taxGroup/interface';
import { TPaymentTypeConfig } from './paymentType/interface';
import { TDepartmentConfig } from './department/interface';
import { TPluConfig } from './plu/interface';
import { TCurrencyConfig } from './currency/interface';

import { IStore } from '../store/interface';

export interface INomenclatureAttributes {
  operators ?:TOperatorsConfig;
  taxGroups ?:TTaxGroupConfig;
  paymentTypes ?:TPaymentTypeConfig;
  departments ?:TDepartmentConfig;
  plus ?:TPluConfig;
  currencies ?:TCurrencyConfig;
}