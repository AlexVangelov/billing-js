// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { ChargesCollection } from './charge';
import { Modifier, ModifiersCollection } from './modifier';
import { PaymentsCollection } from './payment';
import { ErrorItem } from './concerns/errorItem';

/**
 * 
 * 
 * @export
 * @class Bill
 * @extends {ErrorItem}
 */
export class Bill extends ErrorItem {
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
}
