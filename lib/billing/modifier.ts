import { BillItem } from './billItem';

export class Modifier extends BillItem {
  constructor(attributes: any = {}) {
    super(attributes.bill);
  }
}