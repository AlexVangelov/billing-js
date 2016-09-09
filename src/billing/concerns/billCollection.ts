// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { BillItem } from './billItem';
import { Bill } from '../bill';

/**
 * 
 * 
 * @export
 * @abstract
 * @class BillCollection
 * @extends {Array<BillItem>}
 */
export abstract class BillCollection extends Array<BillItem> {
  /**
   * 
   * 
   * @type {Bill}
   */
  protected bill: Bill;

  /**
   * Creates an instance of BillCollection.
   * 
   * @param {Bill} bill
   */
  constructor(bill: Bill) {
    super();
    this.bill = bill;
  }

  getBill() :Bill {
    return this.bill;
  }

  /**
   * 
   * 
   * @param {BillItem} item
   * @returns {BillItem}
   */
  add(item: BillItem) :BillItem {
    let itemBill = item.getBill();
    if (itemBill) {
      if (itemBill !== this.bill) throw new ReferenceError("Trying to add cross bill item. Use 'transfer'.");
    } else item.update({ bill: this.bill });
    if (!~this.indexOf(item)) this.push(item);
    return item;
  }

  /**
   * 
   * 
   * @param {BillItem} item
   * @returns {boolean}
   */
  remove(item: BillItem) :boolean {
    let index = this.indexOf(item);
    if (!!~index) {
      this.splice(index, 1);
      return true;
    } else return false;
  }

  save() :boolean {
    let success = true;
    this.forEach((item)=> {
      if (!item.save()) success = success || false;
    });
    return success;
  }
}