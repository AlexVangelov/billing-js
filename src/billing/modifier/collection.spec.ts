/// <reference path="../../../typings/index.d.ts" />

import { ModifiersCollection } from './collection';
import { Bill } from '../bill';
import { Modifier } from '../modifier';
import { Charge } from '../charge';

describe('ChargesCollection', () => {
  let bill = new Bill();

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
});