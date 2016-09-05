import { BillItem } from './billItem';
import { Bill } from '../bill';

export abstract class BillCollection extends Array<BillItem> {
  bill: Bill;

  constructor(bill: Bill) {
    super();
    this.bill = bill;
  }

  add(item: BillItem) :BillItem {
    if (item.bill) {
      if (item.bill !== this.bill) throw new ReferenceError("Trying to add cross bill item. Use 'transfer'.");
    } else item.bill = this.bill;
    if (!~this.indexOf(item)) this.push(item);
    return item;
  }

  remove(item: BillItem) :boolean {
    let index = this.indexOf(item);
    if (!!~index) {
      this.splice(index, 1);
      return true;
    } else return false;
  }
}