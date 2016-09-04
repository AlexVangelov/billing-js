import { Payment } from './index'

export class PaymentsCollection extends Array<Payment> {
  sum() :number {
    let sum = 0;
    this.forEach((payment)=> {
      sum += payment.value;
    });
    return sum;
  }
}