import { Bill } from '../bill';
import { Charge } from '../charge';

export interface IModifierAttributes {
  bill?: Bill;
  charge?: Charge;
  percentRatio?: number;
  fixedValue?: number;
}