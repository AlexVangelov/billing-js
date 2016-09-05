// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Modifier } from './index';
import { Bill } from '../bill';
import { BillCollection } from '../concerns/billCollection';
import { IModifierAttributes } from './interface';
import { ErrorItem } from '../concerns/errorItem';

/**
 * 
 * 
 * @export
 * @class ModifiersCollection
 * @extends {BillCollection}
 */
export class ModifiersCollection extends BillCollection {

  /**
   * 
   * 
   * @param {IModifierAttributes} [attributes={}]
   * @returns {Modifier}
   */
  new(attributes: IModifierAttributes = {}) :Modifier {
    attributes.bill = this.bill;
    return <Modifier> this.add(new Modifier(attributes));
  }

  /**
   * 
   * 
   * @returns {number}
   */
  sum() :number {
    let sum = 0;
    this.forEach((modifier)=> {
      sum += (<Modifier> modifier).value();
    });
    return sum;
  }
}