import { Charge } from './index'

export class ChargesCollection extends Array<Charge> {

  sum() :number {
    let sum = 0;
    this.forEach((charge)=> {
      sum += charge.value();
    });
    return sum;
  }
}