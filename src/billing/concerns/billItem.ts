import { Bill } from '../bill';

export abstract class BillItem {
  bill: Bill;
  
  constructor(bill: Bill) {
    this.bill = bill;
  }
}
