import { BillItem } from '../concerns/billItem';
import { IPaymentAttributes } from './interface';

export class Payment extends BillItem {
  value :number = 0;

  constructor(attributes: IPaymentAttributes = {}) {
    super(attributes.bill);
    if (!attributes.value) {
      if (this.bill) this.value = this.bill.total();
    }
  }
}

export { PaymentsCollection } from './collection';