// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bill } from '../bill';
import { ValidationModel } from './validations';
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
  protected _bill: Bill;

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
    this._bill = bill;
  }

  abstract update(attribute :BillItemAttributes) :boolean;

  /**
   * 
   * 
   * @returns {Bill}
   * 
   * @memberOf BillItem
   */
  get bill() {
    return this._bill;
  }

  /**
   * 
   * 
   * @returns {boolean}
   */
  save() :boolean {
    if (this.isValid) return false;
    else {
      this.isSaved = true;
    }
    return this.isSaved;
  }

  toJson(useNomenclatureIds = false) :any {}
}
