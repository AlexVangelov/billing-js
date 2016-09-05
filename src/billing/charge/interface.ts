import { Bill } from '../bill';
import { Modifier } from '../modifier';
import { IModifierAttributes } from '../modifier/interface';

type ModifierObject = Modifier | IModifierAttributes;

export interface IChargeAttributes {
  bill?: Bill;
  name?: string;
  qty?: number;
  price?: number;
  description?: string;
  modifier?: ModifierObject;
}