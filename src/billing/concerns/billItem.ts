// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bill } from '../bill';
import { ErrorItem } from './errorItem';

/**
 * 
 * 
 * @export
 * @abstract
 * @class BillItem
 * @extends {ErrorItem}
 */
export abstract class BillItem extends ErrorItem {
  /**
   * 
   * 
   * @type {Bill}
   */
  bill: Bill;
  
  /**
   * Creates an instance of BillItem.
   * 
   * @param {Bill} bill
   */
  constructor(bill: Bill) {
    super();
    this.bill = bill;
  }
}
