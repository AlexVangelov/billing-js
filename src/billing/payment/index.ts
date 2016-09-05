import { BillItem } from '../concerns/billItem';
import { IPaymentAttributes } from './interface';

export class Payment extends BillItem {
  value :number = 0;

  constructor(attributes: IPaymentAttributes = {}) {
    super(attributes.bill);
    if (!attributes.value) {
      if (this.bill) this.value = this.bill.total() - this.bill.payments.sum();
    } else {
      this.value = attributes.value;
    }
    if (this.bill) this.bill.payments.add(this);
  }

  delete():Boolean {
    if (this.bill) this.bill.payments.remove(this);
    return delete this;
  }
}

export { PaymentsCollection } from './collection';