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
  state :any;
  /**
   * 
   * 
   * @type {Bill}
   */
  protected _bill: Bill;

  billId :any;
  isSaved: boolean = false;
  
  /**
   * Creates an instance of BillItem.
   * 
   * @param {Bill} bill
   */
  constructor(attributes :any = {}) {
    super(attributes);
    if (attributes.billId) this.billId = attributes.billId;
    if (this.billId && attributes.bill && this.billId !== attributes.bill) throw('Cross bill id!');
    this._bill = attributes.bill;
  }

  abstract update(attribute :BillItemAttributes) :boolean;
  abstract toJson(useNomenclatureIds :boolean) :any;

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
  save(callback ?:Function) :boolean {
    if (!this.isValid) {
      this.isSaved = false;
      if (callback) callback(this.errors, this);
    } else {
      this.isSaved = true;
      this.constructor['save'](this, callback);
    }
    return this.isSaved;
  }

  jsonBase(initial :any = {}) :any {
    if (this.id) initial['id'] = this.id;
    if (this._bill && this._bill.id) initial['billId'] = this._bill.id;
    return initial;
  }

}
