import { BillItem } from './billItem';
export class Charge extends BillItem {
  constructor(attributes: any = {}) {
    super(attributes.bill);
  }
}