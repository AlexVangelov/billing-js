// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { BillItem } from '../concerns/billItem';
import { Charge } from '../charge';
import { IModifierAttributes } from './interface';

/**
 * 
 * 
 * @export
 * @class Modifier
 * @extends {BillItem}
 */
export class Modifier extends BillItem {
  /**
   * 
   * 
   * @type {Charge}
   */
  charge :Charge;
  /**
   * 
   * 
   * @type {number}
   */
  percentRatio :number;
  /**
   * 
   * 
   * @type {number}
   */
  fixedValue :number = 0;

  /**
   * Creates an instance of Modifier.
   * 
   * @param {IModifierAttributes} [attributes={}]
   */
  constructor(attributes: IModifierAttributes = {}) {
    super(attributes.bill);
    this.percentRatio = attributes.percentRatio;
    if (attributes.fixedValue) this.fixedValue = attributes.fixedValue;
    this.charge = attributes.charge;
    if (this.charge) {
      if (this.charge.bill) {
        if (!this.bill) this.bill = this.charge.bill;
        else if (this.bill !== this.charge.bill) throw new ReferenceError('Modifier with charge belonging to another bill.');
        if (this.charge.modifier) this.charge.bill.modifiers.remove(this.charge.modifier);
      }
      this.charge.modifier = this;
    }
    if (this.bill) this.bill.modifiers.add(this);
  }

  /**
   * 
   * 
   * @returns {number}
   */
  value(): number {
    if (this.charge || this.bill) {
      if (!this.percentRatio) return this.fixedValue;
      if (this.charge) {
        return this.charge.value() * this.percentRatio;
      } else {
        return this.bill.charges.finalSum() * this.percentRatio;
      }
    }
  }

  /**
   * 
   * 
   * @returns {Boolean}
   */
  delete():Boolean {
    if (this.bill) this.bill.modifiers.remove(this);
    if (this.charge) delete this.charge.modifier;
    return delete this;
  }
}

export { ModifiersCollection } from './collection';