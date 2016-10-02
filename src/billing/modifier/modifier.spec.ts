// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/// <reference path="../../../typings/index.d.ts" />

import { Modifier } from './index';
import { Charge } from '../charge';
import { Bill } from '../bill';

describe('Modifier', () => {
  it('default value', () => {
    let modifier = new Modifier();
    expect(modifier.fixedValue).toEqual(0);
  });

  it('without parent', ()=> {
    let modifier = new Modifier({ percentRatio: 0.3 });
    expect(modifier.value).toBeUndefined();
    modifier = new Modifier({ fixedValue: 0.3 });
    expect(modifier.value).toBeUndefined();
  });

  it('charge percent', ()=> {
    let charge = new Charge({ qty: 2, price: 10.5 });
    let modifier = new Modifier({ charge: charge, percentRatio: 0.3 });
    expect(charge.modifier).toEqual(modifier);
    expect(modifier.value).toEqual((21 * 30 ) / 100);
  });

  it('charge fixed', ()=> {
    let charge = new Charge({ qty: 2, price: 10.5 });
    let modifier = new Modifier({ charge: charge, fixedValue: 0.3 });
    expect(modifier.value).toEqual(0.3);
  });

  it('global percent', ()=> {
    let bill = new Bill();
    bill.charges.new({ price: 14 });
    expect(bill.total).toEqual(14);
    let modifier = new Modifier({ bill: bill, percentRatio: -0.5});
    expect(modifier.value).toEqual(-7);
  });

  it('global fixed', ()=> {
    let bill = new Bill();
    let modifier = new Modifier({ bill: bill, fixedValue: 0.3 });
    expect(modifier.value).toEqual(0.3);
  });

  it('global percent with mod charge fixed', ()=> {
    let bill = new Bill();
    bill.charges.new({ price: 5, modifier: { fixedValue: 2}});
    let modifier = new Modifier({ bill: bill, fixedValue: 0.3 });
    expect(modifier.value).toEqual(0.3);
  });

  it('global percent with mod charge percent', ()=> {
    let bill = new Bill();
    let charge = bill.charges.new({ price: 8, modifier: { percentRatio: 0.5 }});
    expect(charge.value).toEqual(8);
    expect(bill.total).toEqual(12);
    let modifier = new Modifier({ bill: bill, percentRatio: 0.5 });
    expect(modifier.value).toEqual(6);
  });

  it('propagate modifier to bill modifiers', ()=> {
    let bill = new Bill();
    let modifier = new Modifier({ bill: bill, fixedValue: 1 });
    expect(bill.modifiers.length).toEqual(1);
    expect(bill.modifiers[0]).toEqual(modifier);
  });

  it('propagate modifier to charge bill modifiers', ()=> {
    let bill = new Bill();
    let charge = bill.charges.new({ price: 8, modifier: { percentRatio: 0.5 }});
    let modifier = new Modifier({ charge: charge, fixedValue: 1 });
    expect(bill.modifiers.length).toEqual(1);
    expect(bill.charges.length).toEqual(1);
    expect(bill.modifiers[0]).toEqual(modifier);
  });

  it('indirect bill through charge', ()=> {
    let bill = new Bill();
    let charge = new Charge({ price: 4, bill: bill });
    let modifier = new Modifier({ fixedValue: 1, charge: charge });
    expect(modifier.bill).toEqual(bill);
    expect(bill.modifiers.length).toEqual(1);
    expect(bill.charges.length).toEqual(1);
  });

  it('delete', ()=> {
    let modifier = new Modifier();
    expect(modifier.delete()).toBeTruthy();
  });

  it('delete with charge', ()=> {
    let charge = new Charge();
    let modifier = new Modifier({ charge: charge, fixedValue: 0.3 });
    expect(charge.bill).not.toBeDefined();
    expect(modifier.delete()).toBeTruthy();
    expect(charge.modifier).not.toBeDefined();
  });

  it('delete with bill charge', ()=> {
    let bill = new Bill();
    bill.charges.new({ price: 5 });
    let modifier = new Modifier({ bill: bill, fixedValue: 0.3 });
    expect(bill.charges.length).toEqual(1);
    expect(bill.modifiers.length).toEqual(1);
    expect(modifier.delete()).toBeTruthy();
    expect(bill.charges.length).toEqual(1);
    expect(bill.modifiers.length).toEqual(0);
  });

  it('delete with bill', ()=> {
    let bill = new Bill();
    let modifier = new Modifier({ bill: bill, fixedValue: 0.3 });
    expect(bill.modifiers.length).toEqual(1);
    expect(modifier.delete()).toBeTruthy();
    expect(bill.modifiers.length).toEqual(0);
  });

  it('cross bill charge', ()=> {
    let bill = new Bill();
    let charge = new Charge({ bill: new Bill() });
    expect(()=> {
      new Modifier({ bill: bill, charge: charge });
    }).toThrowError(ReferenceError);
  });

  it('matching bill charge', ()=> {
    let bill = new Bill();
    let charge = new Charge({ bill: bill });
    expect(()=> {
      new Modifier({ bill: bill, charge: charge });
    }).not.toThrowError(ReferenceError);
  });

  it('unique bill', ()=> {
    let bill = new Bill();
    bill.modifiers.new({ fixedValue: 1 });
    expect(()=> { bill.modifiers.new({ fixedValue: 2 }); }).toThrowError(ReferenceError);
  });

  it('bill validation', ()=> {
    let modifier = new Modifier({ percentRatio: 1 })
    expect(modifier.isValid).toBeFalsy();
    expect(modifier.errors.messages[0]).toEqual("Bill can't be blank");
  });

  it('percent or value validation', ()=> {
    let bill = new Bill();
    let modifier = bill.modifiers.new()
    expect(modifier.isValid).toBeFalsy();
  });

  it('set charge by attributes not supported', function() {
    let modifier = new Modifier({ fixedValue: 1 });
    expect(()=>{ modifier.charge = <Charge>{ price: 1 }; }).toThrowError(ReferenceError);
  });

  it('zero charge modifier', function() {
    let charge = new Charge({ price: 1 });
    let modifier = charge.modify({ percentRatio: 0 });
    expect(modifier.isValid).toBeFalsy();
    expect(modifier.errors.messages).toContain("Value can't be blank");
  });

  it ('update nothing', function() {
    let modifier = new Modifier();
    expect(()=>{ modifier.update() }).not.toThrow();
  });
});