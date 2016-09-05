import { ChargesCollection } from './charge';
import { Modifier, ModifiersCollection } from './modifier';
import { PaymentsCollection } from './payment';
import { ErrorItem } from './concerns/errorItem';

export class Bill extends ErrorItem {
  charges :ChargesCollection = new ChargesCollection(this);
  modifiers :ModifiersCollection = new ModifiersCollection(this);
  payments :PaymentsCollection = new PaymentsCollection(this);

  total() :number {
    return this.charges.sum() + this.modifiers.sum();
  }
}
