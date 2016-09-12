// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { BillItem } from '../concerns/billItem';
import { IPaymentAttributes } from './interface';

/**
 * 
 * 
 * @export
 * @class Payment
 * @extends {BillItem}
 */
export class Payment extends BillItem {
  /**
   * 
   * 
   * @type {number}
   */
  value :number = 0;

  /**
   * Creates an instance of Payment.
   * 
   * @param {IPaymentAttributes} [attributes={}]
   */
  constructor(attributes: IPaymentAttributes = {}) {
    super(attributes.bill);
    if (!attributes.value) {
      if (this.bill) this.value = this.bill.total - this.bill.payments.sum();
    }
    this.update(attributes);
  }

  /**
   * 
   * 
   * @returns {Boolean}
   */
  delete():Boolean {
    if (this.bill) this.bill.payments.remove(this);
    return delete this;
  }

  update(attributes: IPaymentAttributes = {}) :boolean {
    if (attributes.bill) this._bill = attributes.bill;
    if (attributes.value) this.value = attributes.value;
    if (this.bill && !~this.bill.payments.indexOf(this)) this.bill.payments.add(this);
    return true;
  }
}

export { PaymentsCollection } from './collection';