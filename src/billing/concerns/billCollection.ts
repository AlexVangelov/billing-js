import { BillItem } from './billItem';
import { Bill } from '../bill';

export abstract class BillCollection extends Array<BillItem> {
  abstract ItemClass;
  bill: Bill;

  constructor(bill: Bill) {
    super();
    this.bill = bill;
  }

  new(attributes: any = {}) :BillItem {
    let charge = new this.ItemClass(attributes);
    return this.add(charge);
  }

  add(item: BillItem) :BillItem {
    let z = new this.ItemClass;
    item.bill = this.bill;
    this.push(item);
    return item;
  }
}