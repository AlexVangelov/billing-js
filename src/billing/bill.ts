import { ChargesCollection } from './charge';
import { Modifier, ModifiersCollection } from './modifier';
import { PaymentsCollection } from './payment';

export class Bill {
  charges :ChargesCollection = new ChargesCollection();
  modifiers :ModifiersCollection = new ModifiersCollection();
  payments :PaymentsCollection = new PaymentsCollection();
  globalModifier :Modifier;

  total() :number {
    return this.charges.sum() - this.modifiers.sum();
  }
}
