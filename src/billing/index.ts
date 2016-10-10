// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bill } from './bill';
import { Charge } from './charge';
import { Modifier } from './modifier';
import { Payment } from './payment';

import { INomenclatureAttributes } from './nomenclature/interface';
import { Nomenclature } from './nomenclature';

export interface IBillingConfig {
  nomenclature ?:INomenclatureAttributes;
}
/**
 * 
 * 
 * @export
 * @class Billing
 */
export class Billing {
  /**
   * 
   * 
   * @type {Array<Bill>}
   */
  bills :Array<Bill> = [];
  
  /**
   * Creates an instance of Billing.
   * 
   */
  constructor(config: IBillingConfig = {}) {
    if (config.nomenclature) Nomenclature.init(config.nomenclature);
  }
}

