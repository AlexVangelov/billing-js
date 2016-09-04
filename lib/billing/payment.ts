import { BillItem } from './billItem';

export class Payment extends BillItem {
  constructor(attributes: any = {}) {
    super(attributes.bill);
  }
}