// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { PaymentType } from './paymentType';
import { TaxGroup } from './taxGroup';
import { Department } from './department';
import { Plu } from './plu';
import { Currency } from './currency';
import { Operator } from './operator';

import { INomenclatureAttributes } from './interface';

export module Nomenclature {
  export function init(config :INomenclatureAttributes) {
    if (config.plus) Plu.initStore(config.plus);
    if (config.paymentTypes) PaymentType.initStore(config.paymentTypes);
  }
}

export {
  PaymentType,
  TaxGroup,
  Department,
  Plu,
  Currency,
  Operator
}