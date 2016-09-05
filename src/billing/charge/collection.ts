import { Charge } from './index';
import { Bill } from '../bill';
import { BillCollection } from '../concerns/billCollection';
import { IChargeAttributes } from './interface';

export class ChargesCollection extends BillCollection {

  new(attributes: IChargeAttributes = {}) :Charge {
    attributes.bill = this.bill;
    let charge = new Charge(attributes);
    if (!~this.indexOf(charge)) charge = this.add(charge);
    return charge;
  }

  add(charge: Charge) :Charge {
    charge.bill = this.bill;
    this.push(charge);
    if (charge.modifier && charge.modifier.bill !== this.bill) this.bill.modifiers.add(charge.modifier);
    return charge;
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