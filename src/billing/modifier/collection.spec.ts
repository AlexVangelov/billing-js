/// <reference path="../../../typings/index.d.ts" />

import { ModifiersCollection } from './collection';
import { Bill } from '../bill';
import { Modifier } from '../modifier';
import { Charge } from '../charge';

describe('ChargesCollection', () => {
  let bill;
  
  beforeEach(()=> {
    bill = new Bill();
  });

  it('init', () => {
    let collection = new ModifiersCollection(bill);
    expect(collection.bill).toEqual(bill);
  });

  it('new', ()=> {
    let collection = new ModifiersCollection(bill);
    let modifier = collection.new();
    expect(modifier instanceof Modifier).toBeTruthy();
    expect(modifier.bill).toEqual(bill);
    expect(collection.length).toEqual(1);
    modifier = collection.new({ fixedValue: 2.5 });
    expect(collection.length).toEqual(2);
    expect(modifier.value()).toEqual(2.5);
  });

  it('add', ()=> {
    let collection = new ModifiersCollection(bill);
    let modifier = new Modifier();
    let addedModifier = collection.add(modifier);
    expect(addedModifier.bill).toEqual(bill);
    expect(collection[0]).toEqual(addedModifier);
  });

  it('sum', ()=> {
    let charge = new Charge();
    let collection = new ModifiersCollection(bill);
    collection.add(new Modifier({ fixedValue: 1.6 }));
    expect(collection.length).toEqual(1);
    expect(collection.sum()).toEqual(1.6);
    collection.new({ charge: charge, fixedValue: 1.2 });
    expect(collection.length).toEqual(2);
    expect(collection.sum()).toEqual(2.8);
  });

  it('remove', ()=> {
    let collection = new ModifiersCollection(bill);
    let modifier = collection.new();
    expect(modifier.bill).toEqual(bill);
    expect(collection[0]).toEqual(modifier);
    expect(collection.remove(modifier)).toBeTruthy();
  });

  it('remove non existing', ()=> {
    let collection = new ModifiersCollection(bill);
    let modifier = new Modifier();
    expect(collection.remove(modifier)).toBeFalsy();
  });

  it('add cross bill', ()=> {
    let bill2 = new Bill();
    let collection = new ModifiersCollection(bill);
    let modifier = new Modifier({ bill: bill2 });
    expect(()=> { collection.add(modifier); }).toThrowError(ReferenceError);
  });

  it('add with cross bill charge', ()=> {
    let bill2 = new Bill();
    let collection = new ModifiersCollection(bill);
    let charge = new Charge({ bill: bill2, price: 2 });
    let modifier = new Modifier({ fixedValue: 3, charge: charge });
    expect(bill.charges.length).toEqual(0);
    expect(bill.modifiers.length).toEqual(0);
    expect(bill2.charges.length).toEqual(1);
    expect(()=> { collection.add(modifier); }).toThrowError(ReferenceError);
  });
});