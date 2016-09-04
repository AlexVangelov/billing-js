import { Modifier } from './index';
import { Bill } from '../bill';

export class ModifiersCollection extends Array<Modifier> {
  bill: Bill;

  constructor(bill: Bill) {
    super();
    this.bill = bill;
  }

  sum() :number {
    let sum = 0;
    this.forEach((modifier)=> {
      sum += modifier.value();
    });
    return sum;
  }
}