// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/// <reference path="../../../typings/index.d.ts" />

import { PaymentsCollection } from './collection';
import { Bill } from '../bill';
import { Payment } from '../payment';
import { Modifier } from '../modifier';

describe('PaymentsCollection', () => {
  let bill;

  beforeEach(()=> {
    bill = new Bill();
  });

  it('init', () => {
    let collection = new PaymentsCollection(bill);
    expect(collection.getBill()).toEqual(bill);
  });

  it('new', ()=> {
    let collection = new PaymentsCollection(bill);
    let payment = collection.new();
    expect(payment instanceof Payment).toBeTruthy();
    expect(payment.getBill()).toEqual(bill);
    expect(collection.length).toEqual(1);
    payment = collection.new({ value: 2.5 });
    expect(payment.getBill()).toEqual(bill);
    expect(bill.payments.sum()).toEqual(2.5);
    expect(collection.length).toEqual(2);
    expect(payment.value).toEqual(2.5);
  });

  it('add', ()=> {
    let collection = new PaymentsCollection(bill);
    let payment = new Payment();
    let addedPayment = collection.add(payment);
    expect(addedPayment.getBill()).toEqual(bill);
    expect(collection[0]).toEqual(addedPayment);
    expect(collection.length).toEqual(1);
  });

  it('sum', ()=> {
    let collection = new PaymentsCollection(bill);
    collection.add(new Payment({ value: 1.6 }));
    expect(collection.length).toEqual(1);
    expect(collection.sum()).toEqual(1.6);
    collection.new({ value: 1.2 });
    expect(collection.length).toEqual(2);
    expect(collection.sum()).toEqual(2.8);
    expect(collection.length).toEqual(2);
  });

  it('remove', ()=> {
    let collection = new PaymentsCollection(bill);
    let payment = collection.new();
    expect(payment.getBill()).toEqual(bill);
    expect(collection[0]).toEqual(payment);
    expect(collection.remove(payment)).toBeTruthy();
  });

  it('remove non existing', ()=> {
    let collection = new PaymentsCollection(bill);
    let payment = new Payment();
    expect(collection.remove(payment)).toBeFalsy();
  });
});