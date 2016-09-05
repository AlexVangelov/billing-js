import { Modifier } from './index';
import { Bill } from '../bill';
import { BillCollection } from '../concerns/billCollection';
import { IModifierAttributes } from './interface';
import { ErrorItem } from '../concerns/errorItem';

export class ModifiersCollection extends BillCollection {

  new(attributes: IModifierAttributes = {}) :Modifier {
    return <Modifier> this.add(new Modifier(attributes));
  }

  sum() :number {
    let sum = 0;
    this.forEach((modifier)=> {
      sum += (<Modifier> modifier).value();
    });
    return sum;
  }
}