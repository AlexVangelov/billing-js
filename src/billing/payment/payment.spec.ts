// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/// <reference path="../../../typings/index.d.ts" />

import { Payment } from './index';
import { Bill } from '../bill';

import * as Nomenclature from '../nomenclature';

describe('Payment', () => {
  it('default values', () => {
    let payment = new Payment();
    expect(payment.value).toEqual(0);
  });

  it('default payment', ()=> {
    let bill = new Bill();
    bill.charges.new({ price: 5 });
    let payment = new Payment({ bill: bill });
    expect(payment.value).toEqual(5);
  });

  it('default payment patrial', ()=> {
    let bill = new Bill();
    bill.charges.new({ price: 5 });
    let payment1 = new Payment({ bill: bill, value: 1 });
    expect(payment1.value).toEqual(1);
    let payment2 = new Payment({ bill: bill });
    expect(payment2.value).toEqual(4);
  });

  it('propagate payment to bill payments', ()=> {
    let bill = new Bill();
    bill.charges.new({ price: 5 });
    let payment = new Payment({ bill: bill });
    expect(bill.payments.length).toEqual(1);
    expect(bill.payments[0]).toEqual(payment);
  });

  it('delete', ()=> {
    let payment = new Payment();
    expect(payment.delete()).toBeTruthy();
  });

  it('delete associated', ()=> {
    let bill = new Bill();
    let payment = bill.payments.new({ value: 5 });
    expect(bill.payments.length).toEqual(1);
    expect(payment.delete()).toBeTruthy();
    expect(bill.payments.length).toEqual(0);
  });

  describe('validations', function() {
    it('require bill', function() {
      let payment = new Payment({ value: 1 });
      expect(payment.isValid).toBeFalsy();
      expect(payment.errors.messages).toContain("Bill can't be blank");
    });

    it('require positive value', function() {
      let payment = new Payment({ value: -1 });
      expect(payment.isValid).toBeFalsy();
      expect(payment.errors.messages).toContain('Value must be greater than 0');
    });

    it('non existing paymentTypeId', function() {
      let bill = new Bill();
      let payment = bill.payments.new({ paymentTypeId: 101, value: 2 });
      expect(payment.isValid).toBeFalsy();
      expect(payment.errors.messages).toContain('PaymentType is not included in the list');
    });
  });

  describe('nomenclature', function() {
    beforeAll(function() {
      Nomenclature.init({
        paymentTypes: [{ id: 1, code: '1', name: 'Custom', isCash: false, isFiscal: false }]
      })
    });

    it('inherit attributes from PaymentType', function() {
      let payment = new Payment({ paymentTypeId: 1 });
      expect(payment.name).toEqual('Custom');
      expect(payment.isCash).toBeFalsy();
      expect(payment.isFiscal).toBeFalsy;
    });

    it('own attributes takes precedence over relations', function() {
      let payment = new Payment({ value: 1, name: 'Cash', isCash: true, isFiscal: true });
      payment.paymentTypeId = 1;
      expect(payment.paymentType.isCash).toBeFalsy();
      expect(payment.name).toEqual('Cash');
      expect(payment.isCash).toBeTruthy();
      expect(payment.isFiscal).toBeTruthy();
    });
  });
});