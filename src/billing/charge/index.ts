import { BillItem } from '../concerns/billItem';
import { Modifier } from '../modifier';

export class Charge extends BillItem {
  modifier :Modifier;
  name :string = '';
  description :string;
  price :number = 0;
  qty :number = 1;

  constructor(attributes: any = {}) {
    super(attributes.bill);
    if (attributes.modifier) {
      attributes.modifier.charge = this;
      attributes.modifier.bill = this.bill;
      if (attributes.modifier instanceof Modifier) {
        this.modifier = attributes.modifier; 
      } else {
        this.modifier = new Modifier(attributes.modifier);
      }
    }
    if (attributes.name) this.name = attributes.name;
    this.description = attributes.description;
    if (attributes.price) this.price = attributes.price;
    if (attributes.qty) this.qty = attributes.qty;
  }

  value() :number {
    return (this.qty * this.price);
  }
}

export { ChargesCollection } from './collection';