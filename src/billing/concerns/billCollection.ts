import { BillItem } from './billItem';
import { Bill } from '../bill';

export abstract class BillCollection extends Array<BillItem> {
  bill: Bill;

  constructor(bill: Bill) {
    super();
    this.bill = bill;
  }

  add(item: BillItem) :BillItem {
    item.bill = this.bill;
    this.push(item);
    return item;
  }
}