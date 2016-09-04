import { BillItem } from '../concerns/billItem';

export class Payment extends BillItem {
  value :number = 0;

  constructor(attributes: any = {}) {
    super(attributes.bill);
    if (!attributes.value) {
      if (this.bill) this.value = this.bill.total();
    }
  }
}

export { PaymentsCollection } from './collection';