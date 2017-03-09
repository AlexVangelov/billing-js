// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Charge, ChargesCollection } from './charge';
import { Modifier, ModifiersCollection } from './modifier';
import { Payment, PaymentsCollection } from './payment';
import { ValidationModel } from './concerns/validations';
import { Operator } from './nomenclature';
import { IBillAttributes } from './interface';

import { parallelExec } from '../utils/parallelExec'; 

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
    let jsonAttributes = JSON.parse(JSON.stringify(attributes));
    if (jsonAttributes.operatorId) this.operatorId = jsonAttributes.operatorId;
    if (jsonAttributes.charges) jsonAttributes.charges.forEach((c)=> this.charges.new(c));
    if (jsonAttributes.modifier) this.modifiers.new(jsonAttributes.modifier);
    if (jsonAttributes.payments) jsonAttributes.payments.forEach((p)=> this.payments.new(p));
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
    let success = this.isValid;
    if (success) {
      this.constructor['save'](this, (record)=> {
        let cbs = [];
        let self = this;
        cbs.push((c)=> {
          if (!self.charges.save((results)=>{ //wait for charges to be saved (provide db chargeId)
            if (!self.modifiers.save(c)) success = false; //seq ] -> par
          })) success = false;  //req  ]
        });
        cbs.push((c)=> {
          if (!self.payments.save(c)) success = false; //       -> par
        });
        if (success) parallelExec(cbs, (allResults)=> {
          if (callback) callback(record);
        }); //else has errors but is it enough?
        this.isSaved = success;
      });
    } else if (callback) callback(this.errors, this); // this is wrong
    return this.isSaved = success;
  }

  toJson(useNomenclatureIds = false, deep = true) :any {
    if (this.isValid) {
      let json = {};
      if (this.id) json['id'] = this.id;
      if (deep) {
        if (this.charges.length) json['charges'] = this.charges.toJson(useNomenclatureIds);
        if (this.payments.length) json['payments'] = this.payments.toJson(useNomenclatureIds);
        if (this.modifier) json['modifier'] = this.modifier.toJson();
      }
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

  afterInitialize(callback :Function) {
    if (this.id) {
      if (!this._charges) {
        Charge.find({ billId: this.id }, (charges)=> {
          charges.forEach((c)=> this.charges.add(c));
          Modifier.find({ billId: this.id }, (modifiers)=> {
            modifiers.forEach((m)=> {
              if (m.chargeId) {
                for (let c in charges) {
                  if (charges[c].id === m.chargeId) {
                    m.charge = charges[c];
                    break;
                  }
                }
              }
              this.modifiers.add(m);
            });
            Payment.find({ billId: this.id }, (payments)=> {
              payments.forEach((p)=> this.payments.add(p));
              callback(this);
            });
          });
        }).catch((err)=>{
          this.addError('charges', err.message);
        });
      } else callback(this);
    }
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
