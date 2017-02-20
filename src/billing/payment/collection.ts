// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Payment } from './index';
import { Bill } from '../bill';
import { BillCollection } from '../concerns/billCollection';
import { IPaymentAttributes } from './interface';

/**
 * 
 * 
 * @export
 * @class PaymentsCollection
 * @extends {BillCollection}
 */
export class PaymentsCollection extends BillCollection {
  constructor(bill: Bill) {
    super(bill);
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, PaymentsCollection.prototype);
    else this['__proto__'] = PaymentsCollection.prototype;
  }
  /**
   * 
   * 
   * @param {IPaymentAttributes} [attributes={}]
   * @returns {Payment}
   */
  new(attributes: IPaymentAttributes = {}) :Payment {
    attributes.bill = this.bill;
    if (this.bill.constructor['_store']) Payment._store = this.bill.constructor['_store'];
    return <Payment> this.add(new Payment(attributes));
  }

  /**
   * 
   * 
   * @returns {number}
   */
  sum() :number {
    let sum = 0;
    this.forEach((payment)=> {
      sum += (<Payment> payment).value;
    });
    return sum;
  }
}
