// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bills } from './collection';

import { INomenclatureAttributes } from './nomenclature/interface';
import { Nomenclature } from './nomenclature';

export interface IBillingConfig {
  nomenclature ?:INomenclatureAttributes;
}

export module Billing {
  export var bills :Bills = new Bills();
  export function config(config: IBillingConfig = {}) {
    if (config.nomenclature) Nomenclature.init(config.nomenclature);
  }
}
