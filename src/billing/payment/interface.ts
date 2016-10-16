// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bill } from '../bill';
import { PaymentType } from '../nomenclature';

/**
 * 
 * 
 * @export
 * @interface IPaymentAttributes
 */
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
  bill ?:Bill;
  /**
   * 
   * 
   * @type {number}
   */
  value ?:number;
  /**
   * 
   * 
   * @type {number}
   * @memberOf IPaymentAttributes
   */
  name ?:string;
  /**
   * 
   * 
   * @type {number}
   * @memberOf IPaymentAttributes
   */
  paymentTypeId ?:number;
  paymentType ?:PaymentType;
  /**
   * 
   * 
   * @type {boolean}
   * @memberOf IPaymentAttributes
   */
  isCash ?:boolean;
  isFiscal ?:boolean;
}