// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { BillItem } from '../concerns/billItem';
import { IPaymentAttributes } from './interface';

import { PaymentType } from '../nomenclature';

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
    return this._isCash ? this._isCash : (this.paymentType ? this.paymentType.isCash : true);
  }
  set isCash(value :boolean) {
    this._isCash = value;
  }

  private _isFiscal :boolean;
  get isFiscal() :boolean {
    return this._isFiscal ? this._isFiscal : (this.paymentType ? this.paymentType.isFiscal : true);
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
      if (this.bill) this.value = this.bill.total - this.bill.payments.sum();
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
    if (attributes.name) this.name = attributes.name;
    if (attributes.value) this.value = attributes.value;
    if (attributes.paymentType) this.paymentType = attributes.paymentType;
    if (attributes.paymentTypeId) this.paymentTypeId = attributes.paymentTypeId;
    if (attributes.isCash) this.isCash = attributes.isCash;
    if (attributes.isFiscal) this.isFiscal = attributes.isFiscal;
    if (attributes.value) this.value = attributes.value;
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
    if (this.paymentTypeId) return PaymentType.find(this.paymentTypeId);
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
      return self.paymentTypeId && ! self.paymentType;
    }, message: 'is not included in the list'
  }
});

export { PaymentsCollection } from './collection';