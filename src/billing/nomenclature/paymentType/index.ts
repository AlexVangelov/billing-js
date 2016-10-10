import { IPaymentType } from './interface';
import { IStore } from '../../store/interface';
import { Store } from '../../store';

export class PaymentType extends Store {
  constructor(attributes :IPaymentType) {
    super();
  }
}