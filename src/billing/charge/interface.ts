// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bill } from '../bill';
import { Modifier } from '../modifier';
import { IModifierAttributes } from '../modifier/interface';

export type ModifierObject = Modifier | IModifierAttributes;

/**
 * 
 * 
 * @export
 * @interface IChargeAttributes
 */
export interface IChargeAttributes {
  /**
   * 
   * 
   * @type {Bill}
   */
  bill ?:Bill;
  /**
   * 
   * 
   * @type {string}
   */
  name ?:string;
  /**
   * 
   * 
   * @type {number}
   */
  qty ?:number;
  /**
   * 
   * 
   * @type {number}
   */
  price ?:number;
  /**
   * 
   * 
   * @type {string}
   */
  description ?:string;
  /**
   * 
   * 
   * @type {number}
   * @memberOf IChargeAttributes
   */
  taxRatio ?:number;
  /**
   * 
   * 
   * @type {ModifierObject}
   */
  modifier ?:ModifierObject;
  /**
   * 
   * 
   * @type {number}
   * @memberOf IChargeAttributes
   */
  pluId ?:number;
  /**
   * 
   * 
   * @type {number}
   * @memberOf IChargeAttributes
   */
  taxGroupId ?:number;
}