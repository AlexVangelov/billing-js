import { BillItem } from '../concerns/billItem';
import { Charge } from '../charge';
import { IModifierAttributes } from './interface';

export class Modifier extends BillItem {
  charge :Charge;
  percentRatio :number;
  fixedValue :number = 0;

  constructor(attributes: IModifierAttributes = {}) {
    super(attributes.bill);
    this.percentRatio = attributes.percentRatio;
    if (attributes.fixedValue) this.fixedValue = attributes.fixedValue;
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