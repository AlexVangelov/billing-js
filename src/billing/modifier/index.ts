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
  private _charge :Charge;
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

  get charge() :Charge {
    return this._charge;
  }

  set charge(charge :Charge) {
    if (charge instanceof Charge) this._charge = charge;
    else throw new ReferenceError('Set Charge by attributes is not allowed for modifier');
  }

  /**
   * 
   * 
   * @returns {number}
   */
  get value(): number {
    if (this.charge || this.bill) {
      if (!this.percentRatio) return this.fixedValue;
      if (this.charge) {
        return this.charge.value * this.percentRatio;
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
    if (attributes.bill) this._bill = attributes.bill;
    if (attributes.percentRatio) this.percentRatio = attributes.percentRatio;
    if (attributes.fixedValue) this.fixedValue = attributes.fixedValue;
    if (attributes.charge) this._charge = attributes.charge;
    if (this.charge) {
      let chargeBill = this.charge.bill;
      if (chargeBill) {
        if (!this.bill) this._bill = chargeBill;
        else if (this.bill !== chargeBill) throw new ReferenceError('Modifier with charge belonging to another bill.');
        let chargeModifier = this.charge.modifier;
        if (chargeModifier) chargeBill.modifiers.remove(chargeModifier);
      }
      if (this.charge.modifier !== this) this.charge.modify(this);
    }
    if (this.bill && !~this.bill.modifiers.indexOf(this)) this.bill.modifiers.add(this);
    return true;
  }
}

Modifier.validates('bill', { 
  presence: true,
  invalid: { 
    if: (self :Modifier)=> {
      if (self.bill && !self.charge) {
        for (let m of self.bill.modifiers) {
          if (!(<Modifier>m).charge && m !== self) return true;
        }
      }
    }, message: 'may have only one global modifier'
  }
});
Modifier.validates('value', { notEqualTo: 0, 
  greaterThanOrEqualTo: (self)=> { 
    if (self.charge) return -self.charge.value;
    else return self.bill ? -self.bill.total + self.value : 0; 
  }
});

export { ModifiersCollection } from './collection';