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
 */
export abstract class BillItem {

  /**
   * 
   * 
   * @type {Bill}
   */
  bill: Bill;

  /**
   * 
   * 
   * @type {boolean}
   */
  isSaved: boolean = false;
  
  /**
   * Creates an instance of BillItem.
   * 
   * @param {Bill} bill
   */
  constructor(bill: Bill) {
    this.bill = bill;
  }

  /**
   * 
   * 
   * @returns {boolean}
   */
  save() :boolean {
    this.isSaved = true;
    return this.isSaved;
  }
}
