import { TOperatorsConfig } from './operator/interface';
import { TTaxGroupConfig } from './taxGroup/interface';
import { TPaymentTypeConfig } from './paymentType/interface';
import { TDepartmentConfig } from './department/interface';
import { TPluConfig } from './plu/interface';

import { IStore } from '../storable/interface';

export interface INomenclatureAttributes {
  operators ?:TOperatorsConfig;
  taxGroups ?:TTaxGroupConfig;
  paymentTypes ?:TPaymentTypeConfig;
  departments ?:TDepartmentConfig;
  plus ?:TPluConfig;
}