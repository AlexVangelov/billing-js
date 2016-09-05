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
      if (!this.percentRatio) return this.fixedValue;
      if (this.charge) {
        return this.charge.value() * this.percentRatio;
      } else {
        return this.bill.charges.finalSum() * this.percentRatio;
      }
    }
  }
}

export { ModifiersCollection } from './collection';