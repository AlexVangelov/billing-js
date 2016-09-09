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
  protected charge :Charge;
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
    this.update(attributes);
  }

  getCharge() :Charge {
    return this.charge;
  }

  setCharge(charge :Charge) :boolean {
    if (charge instanceof Charge) this.charge = charge;
    else throw new ReferenceError('Set Charge by attributes is not allowed for modifier');
    return true;
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
    if (this.charge) delete this.charge.deleteModifier();
    return delete this;
  }

  update(attributes: IModifierAttributes = {}) :boolean {
    if (attributes.bill) this.bill = attributes.bill;
    if (attributes.percentRatio) this.percentRatio = attributes.percentRatio;
    if (attributes.fixedValue) this.fixedValue = attributes.fixedValue;
    if (attributes.charge) this.charge = attributes.charge;
    if (this.charge) {
      let chargeBill = this.charge.getBill();
      if (chargeBill) {
        if (!this.bill) this.bill = chargeBill;
        else if (this.bill !== chargeBill) throw new ReferenceError('Modifier with charge belonging to another bill.');
        let chargeModifier = this.charge.getModifier();
        if (chargeModifier) chargeBill.modifiers.remove(chargeModifier);
      }
      if (this.charge.getModifier() !== this) this.charge.modify(this);
    }
    if (this.bill && !~this.bill.modifiers.indexOf(this)) this.bill.modifiers.add(this);
    return true;
  }
}

export { ModifiersCollection } from './collection';