import { Bill } from '../bill';

export interface IPaymentAttributes {
  bill?: Bill;
  value?: number;
}