import { Charge } from './index';
import { Bill } from '../bill';
import { BillCollection } from '../concerns/billCollection';

export class ChargesCollection extends BillCollection {
  ItemClass = Charge;

  sum() :number {
    let sum = 0;
    this.forEach((charge)=> {
      sum += (<Charge> charge).value();
    });
    return sum;
  }
}