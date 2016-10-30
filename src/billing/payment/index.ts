// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { BillItem } from '../concerns/billItem';
import { IPaymentAttributes } from './interface';

import { PaymentType } from '../nomenclature';
import { PaymentsCollection } from './collection';

/**
 * 
 * 
 * @export
 * @class Payment
 * @extends {BillItem}
 */
export class Payment extends BillItem {
  /**
   * 
   * 
   * @type {number}
   */
  value :number = 0;

  paymentTypeId :number;

  private _name :string;
  get name() :string {
    return this._name ? this._name : (this.paymentType ? this.paymentType.name : '');
  }
  set name(value :string) {
    this._name = value;
  }

  private _isCash :boolean;
  get isCash() :boolean {
    return (typeof this._isCash !== 'undefined') ? this._isCash : (this.paymentType ? this.paymentType.isCash : true);
  }
  set isCash(value :boolean) {
    this._isCash = value;
  }

  private _isFiscal :boolean;
  get isFiscal() :boolean {
    return (typeof this._isFiscal !== 'undefined') ? this._isFiscal : (this.paymentType ? this.paymentType.isFiscal : true);
  }
  set isFiscal(value :boolean) {
    this._isFiscal = value;
  }

  /**
   * Creates an instance of Payment.
   * 
   * @param {IPaymentAttributes} [attributes={}]
   */
  constructor(attributes: IPaymentAttributes = {}) {
    super(attributes.bill);
    if (!attributes.value) {
      if (this.bill) this.value = Math.round((this.bill.total - this.bill.payments.sum()) * 100) / 100;
    }
    this.update(attributes);
  }

  /**
   * 
   * 
   * @returns {Boolean}
   */
  delete():Boolean {
    if (this.bill) this.bill.payments.remove(this);
    return delete this;
  }

  update(attributes: IPaymentAttributes = {}) :boolean {
    if (attributes.bill) this._bill = attributes.bill;
    if (typeof attributes.name !== 'undefined') this.name = attributes.name;
    if (typeof attributes.value !== 'undefined') this.value = attributes.value;
    if (attributes.paymentType) this.paymentType = attributes.paymentType;
    if (attributes.paymentTypeId) this.paymentTypeId = attributes.paymentTypeId;
    if (typeof attributes.isCash !== 'undefined') this._isCash = attributes.isCash;
    if (typeof attributes.isFiscal !== 'undefined') this._isFiscal = attributes.isFiscal;
    if (this.bill && !~this.bill.payments.indexOf(this)) this.bill.payments.add(this);
    return true;
  }

  toJson(useNomenclatureIds = false) {
    if (this.isValid) {
      let json = {
        name: this.name,
        value: this.value,
        isCash: this.isCash,
        isFiscal: this.isFiscal
      }
      if (useNomenclatureIds) {
        if (this.paymentTypeId) json['paymentTypeId'] = this.paymentTypeId;
      }
      return json;
    }
  }

  get paymentType() {
    let _paymentType :PaymentType;
    if (this.paymentTypeId) PaymentType.find(this.paymentTypeId, (r)=> {
      _paymentType = r;
    }).catch((err)=> {
      console.warn(`Payment#paymentType ${this.paymentTypeId} ${err.message}`);
    });;
    return _paymentType;
  }
  set paymentType(paymentType :PaymentType) {
    this.paymentTypeId = paymentType.id;
  }
}

Payment.validates('bill', { presence: true });
Payment.validates('value', { greaterThan: 0 });
Payment.validates('paymentType', {
  invalid: {
    if: (self)=> {
      return self.paymentTypeId && !self.paymentType;
    }, message: 'is not included in the list'
  }
});

export { PaymentsCollection };