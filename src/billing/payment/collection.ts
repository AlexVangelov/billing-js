import { Payment } from './index';
import { Bill } from '../bill';

export class PaymentsCollection extends Array<Payment> {
  bill: Bill;

  constructor(bill: Bill) {
    super();
    this.bill = bill;
  }

  sum() :number {
    let sum = 0;
    this.forEach((payment)=> {
      sum += payment.value;
    });
    return sum;
  }
}