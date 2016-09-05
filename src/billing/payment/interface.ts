// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bill } from '../bill';

/**
 * 
 * 
 * @export
 * @interface IPaymentAttributes
 */
export interface IPaymentAttributes {
  /**
   * 
   * 
   * @type {Bill}
   */
  bill?: Bill;
  /**
   * 
   * 
   * @type {number}
   */
  value?: number;
}