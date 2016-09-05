import { Modifier } from './index';
import { Bill } from '../bill';
import { BillCollection } from '../concerns/billCollection';

export class ModifiersCollection extends BillCollection {
  ItemClass = Modifier;

  sum() :number {
    let sum = 0;
    this.forEach((modifier)=> {
      sum += (<Modifier> modifier).value();
    });
    return sum;
  }
}