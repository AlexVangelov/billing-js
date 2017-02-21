// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Charge } from './index';
import { Bill } from '../bill';
import { BillCollection } from '../concerns/billCollection';
import { IChargeAttributes } from './interface';

/**
 * 
 * 
 * @export
 * @class ChargesCollection
 * @extends {BillCollection}
 */
export class ChargesCollection extends BillCollection {
  constructor(bill: Bill) {
    super(bill);
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, ChargesCollection.prototype);
    else this['__proto__'] = ChargesCollection.prototype;
    if (bill.id) {
      console.log('charges has bill id');
    }
  }
  /**
   * 
   * 
   * @param {IChargeAttributes} [attributes={}]
   * @returns {Charge}
   */
  new(attributes: IChargeAttributes = {}) :Charge {
    attributes.bill = this.bill;
    if (this.bill.constructor['_store']) Charge._store = this.bill.constructor['_store'];
    return <Charge> this.add(new Charge(attributes));
  }

  /**
   * 
   * 
   * @param {Charge} charge
   * @returns {Charge}
   */
  add(charge: Charge) :Charge {
    let chargeBill = charge.bill
    if (chargeBill) {
      if (chargeBill !== this.bill) throw new ReferenceError("Trying to add cross bill charge. Use 'transfer'.");
    } else charge.update({ bill: this.bill });
    if (!~this.indexOf(charge))this.push(charge);

    let chargeModifier = charge.modifier;
    if (chargeModifier) this.bill.modifiers.add(chargeModifier);
    return charge;
  }

  /**
   * 
   * 
   * @param {Charge} charge
   * @returns {boolean}
   */
  remove(charge: Charge) :boolean {
    let index = this.indexOf(charge);
    if (!!~index) {
      let chargeModifier = charge.modifier;
      if (chargeModifier) this.bill.modifiers.remove(chargeModifier);
      this.splice(index, 1);
      return true;
    } else return false;
  }

  /**
   * 
   * 
   * @returns {number}
   */
  sum() :number {
    let sum = 0;
    this.forEach((charge)=> {
      sum += (<Charge>charge).value;
    });
    return sum;
  }

  /**
   * 
   * 
   * @returns {number}
   */
  finalSum() :number {
    let sum = 0;
    this.forEach((charge)=> {
      sum += (<Charge>charge).finalValue;
    });
    return sum;
  }
}
