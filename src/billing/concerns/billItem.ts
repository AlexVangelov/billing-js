import { Bill } from '../bill';
import { ErrorItem } from './errorItem';

export abstract class BillItem extends ErrorItem {
  bill: Bill;
  
  constructor(bill: Bill) {
    super();
    this.bill = bill;
  }
}
