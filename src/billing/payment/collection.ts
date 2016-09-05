import { Payment } from './index';
import { Bill } from '../bill';
import { BillCollection } from '../concerns/billCollection';

export class PaymentsCollection extends BillCollection {
  ItemClass = Payment;

  sum() :number {
    let sum = 0;
    this.forEach((payment)=> {
      sum += (<Payment> payment).value;
    });
    return sum;
  }
}