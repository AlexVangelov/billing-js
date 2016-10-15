// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { ChargesCollection } from './charge';
import { Modifier, ModifiersCollection } from './modifier';
import { PaymentsCollection } from './payment';
import { ValidationModel } from './concerns/validations';
import { Operator } from './nomenclature';
import { IBillAttributes } from './interface';

export declare type GlobalModifier = Modifier;
/**
 * 
 * 
 * @export
 * @class Bill
 * @extends {ErrorItem}
 */
export class Bill extends ValidationModel {
  isSaved: boolean;

  constructor(attributes :IBillAttributes = {}) {
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
   * @type {number}
   * @memberOf Bill
   */
  operatorId :number;
  /**
   * 
   * 
   * @type {PaymentsCollection}
   */
  payments :PaymentsCollection = new PaymentsCollection(this);

  get modifier() :GlobalModifier {
    for (let m of this.modifiers) {
      if (!(<Modifier>m).charge) return <GlobalModifier>m;
    }
  }
  
  /**
   * 
   * 
   * @returns {number}
   */
  get total() :number {
    return this.charges.sum() + this.modifiers.sum();
  }

  /**
   * 
   * 
   * @returns {number}
   */
  get balance() :number {
    return this.total - this.payments.sum();
  }

  save() :boolean {
    let success = true;
    if (!this.charges.save()) success = success || true;
    if (!this.modifiers.save()) success = success || true;
    if (!this.payments.save()) success = success || true;
    return this.isSaved = success;
  }

  toJson() :any {
    if (this.isValid) {
      let json = {};
      if (this.charges.length) json['charges'] = this.charges.toJson();
      if (this.payments.length) json['payments'] = this.payments.toJson();
      if (this.modifier) json['modifier'] = this.modifier.toJson();
      return json;
    }
  }

  get operator() {
    if (this.operatorId) return Operator.find(this.operatorId);
  }

  static new(attributes :any = {}) :Bill {
    return new Bill(attributes);
  }
}

Bill.validates('charges', {
  invalid: { 
    if: (self)=> {
      for (let charge of self.charges) {
        if (!charge.isValid) return true;
      }
    }, message: 'are invalid'
  }
});
Bill.validates('modifiers', {
  invalid: { 
    if: (self)=> {
      for (let modifier of self.modifiers) {
        if (!modifier.isValid) return true;
      }
    }, message: 'are invalid'
  }
});
Bill.validates('payments', {
  invalid: { 
    if: (self)=> {
      for (let payment of self.payments) {
        if (!payment.isValid) return true;
      }
    }, message: 'are invalid'
  }
});
