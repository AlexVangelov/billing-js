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
    super(attributes);
    if (attributes.operatorId) this.operatorId = attributes.operatorId;
  }

  private _charges :ChargesCollection;
  get charges() :ChargesCollection {
    if (!this._charges) this._charges = new ChargesCollection(this);
    return this._charges; 
  }
  
  private _modifiers :ModifiersCollection;
  get modifiers() :ModifiersCollection {
    if (!this._modifiers) this._modifiers = new ModifiersCollection(this);
    return this._modifiers;
  }
  /**
   * 
   * 
   * @type {number}
   * @memberOf Bill
   */
  operatorId :number;
  
  private _payments :PaymentsCollection;
  get payments() :PaymentsCollection {
    if (!this._payments) this._payments = new PaymentsCollection(this);
    return this._payments;
  }

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

  save(callback ?:Function) :boolean {
    let success = true;
    if (!this.charges.save()) success = false;
    if (!this.modifiers.save()) success = false;
    if (!this.payments.save()) success = false;
    if (success) this.constructor['save'](this, callback);
    else if (callback) callback(this.errors, this);
    return this.isSaved = success;
  }

  toJson(useNomenclatureIds = false) :any {
    if (this.isValid) {
      let json = {};
      if (this.charges.length) json['charges'] = this.charges.toJson(useNomenclatureIds);
      if (this.payments.length) json['payments'] = this.payments.toJson(useNomenclatureIds);
      if (this.modifier) json['modifier'] = this.modifier.toJson();
      return json;
    }
  }

  get operator() {
    let _operator :Operator;
    if (this.operatorId) {
      Operator.find(this.operatorId, (operator)=> {
        _operator = operator;
      }).catch((err)=> {
        console.warn(`Bill#operator ${this.operatorId} ${err.message}`);
      });
    }
    return _operator;
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
