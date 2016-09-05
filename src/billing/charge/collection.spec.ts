/// <reference path="../../../typings/index.d.ts" />

import { ChargesCollection } from './collection';
import { Bill } from '../bill';
import { Charge } from '../charge';

describe('ChargesCollection', () => {
  let bill = new Bill();

  it('init', () => {
    let chargesCollection = new ChargesCollection(bill);
    expect(chargesCollection.bill).toEqual(bill);
  });

  it('new', ()=> {
    let chargesCollection = new ChargesCollection(bill);
    let charge = chargesCollection.new();
    expect(charge instanceof Charge).toBeTruthy();
    expect(charge.bill).toEqual(bill);
    expect(chargesCollection.length).toEqual(1);
    charge = chargesCollection.new({ price: 2.5 });
    expect(chargesCollection.length).toEqual(2);
    expect((<Charge> charge).price).toEqual(2.5);
  });

  it('add', ()=> {
    let chargesCollection = new ChargesCollection(bill);
    let charge = new Charge();
    let addedCharge = chargesCollection.add(charge);
    expect(addedCharge.bill).toEqual(bill);
    expect(chargesCollection[0]).toEqual(addedCharge);
  });

  it('sum', ()=> {
    let chargesCollection = new ChargesCollection(bill);
    chargesCollection.add(new Charge({ price: 1.6 }));
    expect(chargesCollection.length).toEqual(1);
    expect(chargesCollection.sum()).toEqual(1.6);
    chargesCollection.new({ price: 1.2 });
    expect(chargesCollection.length).toEqual(2);
    expect(chargesCollection.sum()).toEqual(2.8);
  });
});