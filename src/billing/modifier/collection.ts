// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Modifier } from './index';
import { Bill } from '../bill';
import { BillCollection } from '../concerns/billCollection';
import { BillItem } from '../concerns/billItem';
import { IModifierAttributes } from './interface';

/**
 * 
 * 
 * @export
 * @class ModifiersCollection
 * @extends {BillCollection}
 */
export class ModifiersCollection extends BillCollection {
  constructor(bill: Bill) {
    super(bill);
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, ModifiersCollection.prototype);
    else this['__proto__'] = ModifiersCollection.prototype;
  }
  /**
   * 
   * 
   * @param {IModifierAttributes} [attributes={}]
   * @returns {Modifier}
   */
  new(attributes: IModifierAttributes = {}) :Modifier {
    attributes.bill = this.bill;
    return <Modifier> this.add(new Modifier(attributes));
  }

  /**
   * 
   * 
   * @returns {number}
   */
  sum() :number {
    let sum = 0;
    this.forEach((modifier)=> {
      sum += (<Modifier> modifier).value;
    });
    return sum;
  }

  add(modifier: Modifier) :Modifier {
    let modifierBill = modifier.bill;
    if (modifierBill) {
      if (modifierBill !== this.bill) throw new ReferenceError("Trying to add cross bill item. Use 'transfer'.");
    } else modifier.update({ bill: this.bill });
    if (!~this.indexOf(modifier)) this.push(modifier);
    return modifier;
  }
}
