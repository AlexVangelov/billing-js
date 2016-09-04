import { Bill } from './bill';
import { Charge } from './charge';
import { Modifier } from './modifier';
import { Payment } from './payment';

export class Billing {
  bills :Array<Bill> = [];
  
  constructor() {
    console.log("Initialize billing");
  }
}
