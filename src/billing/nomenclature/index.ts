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
import { Store } from '../store';
import { IStore, IStoreRecord } from '../store/interface';

const NOMENCLATURES = ['operators', 'taxGroups', 'paymentTypes', 'departments', 'plus', 'currencies'];

export class Nomenclature {
  operators :IStore;
  taxGroups :IStore;
  paymentTypes :IStore;
  departments :IStore;
  plus :IStore;
  currencies :IStore;

  constructor(config :INomenclatureAttributes) {
    for(let n of NOMENCLATURES) {
      if (config[n]) this[n] = Store.init(config[n]);
    }
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