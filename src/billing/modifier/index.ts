import { BillItem } from '../concerns/billItem';
import { Charge } from '../charge';

export class Modifier extends BillItem {
  charge :Charge;
  percentRatio :number;
  fixedValue :number = 0;

  constructor(attributes: any = {}) {
    super(attributes.bill);
    this.percentRatio = attributes.percentRatio;
    this.fixedValue = attributes.fixedValue;
    this.charge = attributes.charge;
  }

  value(): number {
    if (this.charge || this.bill) {
      var modValue = this.charge ? this.charge.value() : this.bill.charges.sum();
      return this.percentRatio ? modValue * this.percentRatio : this.fixedValue;
    }
  }
}

export { ModifiersCollection } from './collection';