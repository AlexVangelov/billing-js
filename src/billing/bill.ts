import { Charge } from './charge';
import { Modifier } from './modifier';
import { Payment } from './payment';

export class Bill {
  charges: Array<Charge> = [];
  modifiers: Array<Modifier> = [];
  payments: Array<Payment> = [];
  globalModifier: Modifier;
}
