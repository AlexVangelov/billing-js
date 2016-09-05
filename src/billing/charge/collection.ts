import { Charge } from './index';
import { Bill } from '../bill';
import { BillCollection } from '../concerns/billCollection';
import { IChargeAttributes } from './interface';

export class ChargesCollection extends BillCollection {

  new(attributes: IChargeAttributes = {}) :Charge {
    attributes.bill = this.bill;
    let charge = new Charge(attributes);
    return this.add(charge);
  }

  add(charge: Charge) :Charge {
    if (charge.bill) {
      if (charge.bill !== this.bill) throw new ReferenceError("Trying to add cross bill charge. Use 'transfer'.");
    } else charge.bill = this.bill;
    if (!~this.indexOf(charge))this.push(charge);
    if (charge.modifier) this.bill.modifiers.add(charge.modifier);
    return charge;
  }

  remove(charge: Charge) :boolean {
    let index = this.indexOf(charge);
    if (!!~index) {
      if (charge.modifier) this.bill.modifiers.remove(charge.modifier);
      this.splice(index, 1);
      return true;
    } else return false;
  }

  sum() :number {
    let sum = 0;
    this.forEach((charge)=> {
      sum += (<Charge> charge).value();
    });
    return sum;
  }

  finalSum() :number {
    let sum = 0;
    this.forEach((charge)=> {
      sum += (<Charge> charge).finalValue();
    });
    return sum;
  }
}