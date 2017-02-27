// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import * as NObjects from './nomenclature';
import { IChargeAttributes } from './charge/interface';
import { IModifierAttributes } from './modifier/interface';
import { IPaymentAttributes } from './payment/interface';

export interface IBillAttributes {
  id ?:any;
  operatorId ?:number;
  charges ?:Array<IChargeAttributes>;
  modifier ?:IModifierAttributes;
  payments ?:Array<IPaymentAttributes>;
}