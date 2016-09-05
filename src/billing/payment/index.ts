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
      if (this.bill) this.value = this.bill.total() - this.bill.payments.sum();
    } else {
      this.value = attributes.value;
    }
    if (this.bill) this.bill.payments.add(this);
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
}

export { PaymentsCollection } from './collection';