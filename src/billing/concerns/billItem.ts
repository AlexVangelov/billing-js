import { Bill } from '../bill';

export abstract class BillItem {
  bill: Bill;
  
  constructor(attributes: any = {}) {
    this.bill = attributes.bill;    
  }
}
