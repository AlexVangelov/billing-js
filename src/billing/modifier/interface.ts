// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bill } from '../bill';
import { Charge } from '../charge';

/**
 * 
 * 
 * @export
 * @interface IModifierAttributes
 */
export interface IModifierAttributes {
  /**
   * 
   * 
   * @type {Bill}
   */
  bill?: Bill;
  /**
   * 
   * 
   * @type {Charge}
   */
  charge?: Charge;
  /**
   * 
   * 
   * @type {number}
   */
  percentRatio?: number;
  /**
   * 
   * 
   * @type {number}
   */
  fixedValue?: number;
}