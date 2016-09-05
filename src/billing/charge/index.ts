import { BillItem } from '../concerns/billItem';
import { Modifier } from '../modifier';
import { IChargeAttributes } from './interface';

export class Charge extends BillItem {
  modifier :Modifier;
  name :string = '';
  description :string;
  price :number = 0;
  qty :number = 1;

  constructor(attributes: IChargeAttributes = {}) {
    super(attributes.bill);
    if (attributes.modifier) {
      attributes.modifier.charge = this;
      attributes.modifier.bill = this.bill;
      if (attributes.modifier instanceof Modifier) {
        this.modifier = <Modifier> attributes.modifier; 
      } else {
        this.modifier = new Modifier(attributes.modifier);
      }
      if (this.bill) this.bill.modifiers.add(this.modifier);
    }
    if (attributes.name) this.name = attributes.name;
    this.description = attributes.description;
    if (attributes.price) this.price = attributes.price;
    if (attributes.qty) this.qty = attributes.qty;
    if (this.bill && !~this.bill.charges.indexOf(this)) this.bill.charges.add(this);
  }

  value() :number {
    return (this.qty * this.price);
  }

  finalValue() :number {
    return this.modifier ? this.value() + this.modifier.value() : this.value();
  }
}

export { ChargesCollection } from './collection';