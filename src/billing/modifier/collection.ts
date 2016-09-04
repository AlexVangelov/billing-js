import { Modifier } from './index'

export class ModifiersCollection extends Array<Modifier> {
  sum() :number {
    let sum = 0;
    this.forEach((modifier)=> {
      sum += modifier.value();
    });
    return sum;
  }
}