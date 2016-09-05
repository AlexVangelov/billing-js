/// <reference path="../../../typings/index.d.ts" />

import { ChargesCollection } from './collection';
import { Bill } from '../bill';
import { Charge } from '../charge';
import { Modifier } from '../modifier';

describe('ChargesCollection', () => {
  let bill;

  beforeEach(()=> {
    bill = new Bill();
  });

  it('init', () => {
    let collection = new ChargesCollection(bill);
    expect(collection.bill).toEqual(bill);
  });

  it('new', ()=> {
    let collection = new ChargesCollection(bill);
    let charge = collection.new();
    expect(charge instanceof Charge).toBeTruthy();
    expect(charge.bill).toEqual(bill);
    expect(collection.length).toEqual(1);
    charge = collection.new({ price: 2.5 });
    expect(collection.length).toEqual(2);
    expect(charge.price).toEqual(2.5);
  });

  it('add', ()=> {
    let collection = new ChargesCollection(bill);
    let charge = new Charge();
    let addedCharge = collection.add(charge);
    expect(addedCharge.bill).toEqual(bill);
    expect(collection[0]).toEqual(addedCharge);
    expect(collection.length).toEqual(1);
  });

  it('sum', ()=> {
    let collection = new ChargesCollection(bill);
    collection.add(new Charge({ price: 1.6 }));
    expect(collection.length).toEqual(1);
    expect(collection.sum()).toEqual(1.6);
    collection.new({ price: 1.2 });
    expect(collection.length).toEqual(2);
    expect(collection.sum()).toEqual(2.8);
    expect(collection.length).toEqual(2);
  });

  it('propagate modifier to bill modifiers on new', ()=> {
    let collection = new ChargesCollection(bill);
    let modifier = new Modifier({ fixedValue: 3 });
    expect(bill.modifiers.length).toEqual(0);
    let charge = collection.new({ price: 3, modifier: modifier });
    expect(bill.modifiers[0]).toEqual(modifier);
    expect(bill.modifiers.length).toEqual(1);
  });

  it('propagate modifier to bill modifiers on add', ()=> {
    let collection = new ChargesCollection(bill);
    let modifier = new Modifier({ fixedValue: 3 });
    let charge = new Charge({ price: 2, modifier: modifier });
    let addedCharge = collection.add(charge);
    expect(bill.modifiers[0]).toEqual(modifier);
    expect(bill.modifiers.length).toEqual(1);
  });
});