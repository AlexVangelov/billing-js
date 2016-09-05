import { Payment } from './index';
import { Bill } from '../bill';
import { BillCollection } from '../concerns/billCollection';
import { IPaymentAttributes } from './interface';

export class PaymentsCollection extends BillCollection {
  
  new(attributes: IPaymentAttributes = {}) :Payment {
    return <Payment> this.add(new Payment(attributes));
  }

  sum() :number {
    let sum = 0;
    this.forEach((payment)=> {
      sum += (<Payment> payment).value;
    });
    return sum;
  }
}