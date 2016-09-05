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
    expect(collection.bill).toEqual(bill);
  });

  it('new', ()=> {
    let collection = new PaymentsCollection(bill);
    let payment = collection.new();
    expect(payment instanceof Payment).toBeTruthy();
    expect(payment.bill).toEqual(bill);
    expect(collection.length).toEqual(1);
    payment = collection.new({ value: 2.5 });
    expect(collection.length).toEqual(2);
    expect(payment.value).toEqual(2.5);
  });

  it('add', ()=> {
    let collection = new PaymentsCollection(bill);
    let payment = new Payment();
    let addedPayment = collection.add(payment);
    expect(addedPayment.bill).toEqual(bill);
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
});