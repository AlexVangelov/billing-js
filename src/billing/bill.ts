// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { ChargesCollection } from './charge';
import { Modifier, ModifiersCollection } from './modifier';
import { PaymentsCollection } from './payment';
import { ValidationModel } from './concerns/validationModel';

/**
 * 
 * 
 * @export
 * @class Bill
 * @extends {ErrorItem}
 */
export class Bill extends ValidationModel {
  isSaved: boolean;

  constructor(attributes :any = {}) {
    super();
  }

  /**
   * 
   * 
   * @type {ChargesCollection}
   */
  charges :ChargesCollection = new ChargesCollection(this);
  /**
   * 
   * 
   * @type {ModifiersCollection}
   */
  modifiers :ModifiersCollection = new ModifiersCollection(this);
  /**
   * 
   * 
   * @type {PaymentsCollection}
   */
  payments :PaymentsCollection = new PaymentsCollection(this);

  /**
   * 
   * 
   * @returns {number}
   */
  total() :number {
    return this.charges.sum() + this.modifiers.sum();
  }

  /**
   * 
   * 
   * @returns {number}
   */
  balance() :number {
    return this.total() - this.payments.sum();
  }

  save() :boolean {
    let success = true;
    if (!this.charges.save()) success = success || true;
    if (!this.modifiers.save()) success = success || true;
    if (!this.payments.save()) success = success || true;
    return this.isSaved = success;
  }

  static new(attributes :any = {}) :Bill {
    return new Bill(attributes);
  }
}
