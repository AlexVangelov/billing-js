import { ChargesCollection } from './charge';
import { Modifier, ModifiersCollection } from './modifier';
import { PaymentsCollection } from './payment';

export class Bill {
  charges :ChargesCollection = new ChargesCollection(this);
  modifiers :ModifiersCollection = new ModifiersCollection(this);
  payments :PaymentsCollection = new PaymentsCollection(this);
  globalModifier :Modifier;

  total() :number {
    return this.charges.sum() + this.modifiers.sum();
  }
}
