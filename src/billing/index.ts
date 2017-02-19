// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bills } from './collection';

import { INomenclatureAttributes } from './nomenclature/interface';
import * as Nomenclature from './nomenclature';

import { IStore } from './storable/interface';
import { MemoryStore } from './storable/memoryStore';

export interface IBillingConfig {
  nomenclature ?:INomenclatureAttributes;
  store ?:IStore
}

export module Billing {
  export var bills :Bills = new Bills();
  export function config(config: IBillingConfig = {}) {
    let nomenclatureStore = config.store ? config.store : new MemoryStore();
    if (config.nomenclature) Nomenclature.init(config.nomenclature, nomenclatureStore);
  }
}
