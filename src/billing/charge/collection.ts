import { Charge } from './index';
import { Bill } from '../bill';

export class ChargesCollection extends Array<Charge> {
  bill: Bill;

  constructor(bill: Bill) {
    super();
    this.bill = bill;
  }

  sum() :number {
    let sum = 0;
    this.forEach((charge)=> {
      sum += charge.value();
    });
    return sum;
  }

  new(attributes: any = {}) :Charge {
    let charge = new Charge(attributes);
    return this.add(charge);
  }

  add(charge: Charge) :Charge {
    charge.bill = this.bill;
    this.push(charge);
    return charge;
  }
}