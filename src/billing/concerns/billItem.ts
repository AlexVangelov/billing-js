// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bill } from '../bill';
import { ValidationModel } from './validationModel';
import { IChargeAttributes } from '../charge/interface';
import { IModifierAttributes } from '../modifier/interface';
import { IPaymentAttributes } from '../payment/interface';

export declare type BillItemAttributes = IChargeAttributes | IModifierAttributes | IPaymentAttributes;
/**
 * 
 * 
 * @export
 * @abstract
 * @class BillItem
 */
export abstract class BillItem extends ValidationModel {

  /**
   * 
   * 
   * @type {Bill}
   */
  protected bill: Bill;

  /**
   * 
   * 
   * @type {boolean}
   */
  isSaved: boolean = false;
  
  /**
   * Creates an instance of BillItem.
   * 
   * @param {Bill} bill
   */
  constructor(bill: Bill) {
    super();
    this.bill = bill;
  }

  abstract update(attribute :BillItemAttributes) :boolean;

  /**
   * 
   * 
   * @returns {Bill}
   * 
   * @memberOf BillItem
   */
  getBill() :Bill {
    return this.bill;
  }

  /**
   * 
   * 
   * @returns {boolean}
   */
  save() :boolean {
    this.isSaved = true;
    return this.isSaved;
  }
}
