/// <reference path="../../../typings/index.d.ts" />

import { Payment } from './index';
import { Bill } from '../bill';

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
});