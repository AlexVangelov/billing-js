// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

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