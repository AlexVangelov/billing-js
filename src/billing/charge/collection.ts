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

  /**
   * 
   * 
   * @param {IChargeAttributes} [attributes={}]
   * @returns {Charge}
   */
  new(attributes: IChargeAttributes = {}) :Charge {
    attributes.bill = this.bill;
    let charge = new Charge(attributes);
    return this.add(charge);
  }

  /**
   * 
   * 
   * @param {Charge} charge
   * @returns {Charge}
   */
  add(charge: Charge) :Charge {
    if (charge.bill) {
      if (charge.bill !== this.bill) throw new ReferenceError("Trying to add cross bill charge. Use 'transfer'.");
    } else charge.bill = this.bill;
    if (!~this.indexOf(charge))this.push(charge);
    if (charge.modifier) this.bill.modifiers.add(charge.modifier);
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
      if (charge.modifier) this.bill.modifiers.remove(charge.modifier);
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
      sum += (<Charge> charge).value();
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
      sum += (<Charge> charge).finalValue();
    });
    return sum;
  }
}