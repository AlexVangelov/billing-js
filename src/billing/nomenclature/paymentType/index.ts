// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IPaymentType } from './interface';
import { IStore } from '../../store/interface';
import { Storable } from '../../storable';

export class PaymentType extends Storable<PaymentType> {
  id :number;
  code :string;
  name :string;
  isCash :boolean;
  isFiscal :boolean;

  constructor(attributes :IPaymentType) {
    super(attributes);
    if (attributes.id) this.id = attributes.id;
    if (attributes.name) this.name = attributes.name;
    if (attributes.code) this.code = attributes.code;
    if (attributes.isCash) this.isCash = attributes.isCash;
    if (attributes.isFiscal) this.isFiscal = attributes.isFiscal;
  }
}