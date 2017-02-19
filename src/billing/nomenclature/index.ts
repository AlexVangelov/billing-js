// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { PaymentType } from './paymentType';
import { TaxGroup } from './taxGroup';
import { Department } from './department';
import { Plu } from './plu';
import { Operator } from './operator';

import { INomenclatureAttributes } from './interface';
import { IStore } from '../storable/interface';
import { MemoryStore } from '../storable/memoryStore';

export function init(config :INomenclatureAttributes, store ?:IStore) {
  if (!store) store = new MemoryStore();
  if (config.plus) Plu.initStore(config.plus, store);
  if (config.paymentTypes) PaymentType.initStore(config.paymentTypes, store);
  if (config.taxGroups) TaxGroup.initStore(config.taxGroups, store);
  if (config.departments) Department.initStore(config.departments, store);
  if (config.operators) Operator.initStore(config.operators, store);
}

export {
  PaymentType,
  TaxGroup,
  Department,
  Plu,
  Operator
}