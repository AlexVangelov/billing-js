/// <reference path="../../../typings/index.d.ts" />

import { Charge } from './index';
import { Modifier } from '../modifier';
import { Bill } from '../bill';

describe('Charge', () => {
  it('default values', () => {
    let bill = new Bill();
    let charge = new Charge({ bill: bill });
    expect(charge.bill).toEqual(bill);
    expect(charge.price).toEqual(0);
    expect(charge.qty).toEqual(1);
    expect(charge.name).toEqual('');
  });

  it('name is string', ()=> {
    let charge = new Charge({ name: null });
    expect(charge.name).toEqual('');
    charge = new Charge({ name: undefined });
    expect(charge.name).toEqual('');
    charge = new Charge({ name: 'Test' });
    expect(charge.name).toEqual('Test');
  });

  it('value', ()=> {
    let charge = new Charge({ price: 1.12 });
    expect(charge.value()).toEqual(1.12);
  });

  it('value with qty', ()=> {
    let charge = new Charge({ qty: 2, price: 1.12 });
    expect(charge.value()).toEqual(2.24);
    charge.qty = 1.5;
    expect(Math.round(charge.value() * 100) / 100).toEqual(1.68);
  });

  it('modifier', ()=> {
    let modifier = new Modifier();
    let charge = new Charge({ modifier: modifier });
    expect(charge.modifier instanceof Modifier).toBeTruthy();
    expect(charge.modifier.charge).toEqual(charge);
  });

  it('modifier from attributes', ()=> {
    let charge = new Charge({ modifier: {} });
    expect(charge.modifier instanceof Modifier).toBeTruthy();
    expect(charge.modifier.charge).toEqual(charge);
  });

  it('propagates self to bill charges', ()=> {
    let bill = new Bill();
    let charge = new Charge({ bill: bill, price: 1 });
    expect(bill.charges.length).toEqual(1);
    expect(bill.charges[0]).toEqual(charge);
  });

  it('populates modifier to bill modifiers', ()=> {
    let bill = new Bill();
    let modifier = new Modifier();
    let charge = new Charge({ bill: bill, modifier: modifier });
    expect(bill.modifiers[0]).toEqual(modifier);
  });

  it('modify fixed', ()=> {
    let charge = new Charge();
    let modifier = charge.modify({ fixedValue: 3 });
    expect(modifier.value()).toEqual(3);
  });

  it('modify percent', ()=> {
    let charge = new Charge({ qty: 3, price: 4});
    let modifier = charge.modify({ percentRatio: 0.4 });
    expect(Math.round(modifier.value() * 100) / 100).toEqual((12 * 40) / 100);
  });

  it('modify propagate modifier to bill modifiers', ()=> {
    let bill = new Bill();
    let charge = new Charge({ bill: bill, qty: 3, price: 4});
    expect(charge.bill).toEqual(bill);
    let modifier = charge.modify({ percentRatio: 0.4 });
    expect(bill.modifiers.length).toEqual(1);
    expect(bill.modifiers[0]).toEqual(modifier);
  });

  it('modify propagate modifier to bill modifiers', ()=> {
    let bill = new Bill();
    let charge = new Charge({ bill: bill, qty: 3, price: 4});
    expect(charge.bill).toEqual(bill);
    let modifier = charge.modify({ percentRatio: 0.4 });
    expect(bill.modifiers.length).toEqual(1);
    expect(bill.modifiers[0]).toEqual(modifier);
  });

  it('modify replace propagation', ()=> {
    let bill = new Bill();
    let charge = new Charge({ bill: bill, qty: 3, price: 4});
    expect(charge.bill).toEqual(bill);
    let modifier1 = charge.modify({ percentRatio: 0.4 });
    expect(bill.modifiers.length).toEqual(1);
    expect(bill.modifiers[0]).toEqual(modifier1);
    let modifier2 = charge.modify({ percentRatio: 0.2 });
    expect(bill.modifiers.length).toEqual(1);
    expect(bill.modifiers[0]).toEqual(modifier2);
  });

  it('modify epmty', ()=> {
    let bill = new Bill();
    let charge = new Charge({ bill: bill, qty: 3, price: 4});
    let modifier = charge.modify();
    expect(modifier.value()).toEqual(0);
  });

  it('modify propagate bill', ()=> {
    let bill = new Bill();
    let charge = new Charge({ qty: 3, price: 4});
    let modifier = charge.modify({ bill: bill});
    expect(charge.bill).toEqual(bill);
  });

  it('indirect bill through modifier', ()=> {
    let bill = new Bill();
    let modifier = new Modifier({ bill: bill, fixedValue: 3});
    let charge = new Charge({ price: 1, modifier: modifier });
    expect(charge.bill).toEqual(bill);
    expect(bill.modifiers.length).toEqual(1);
    expect(bill.charges.length).toEqual(1);
  });

  it('indirect bill through modify', ()=> {
    let bill = new Bill();
    let charge = new Charge({ price: 1 });
    let modifier = charge.modify({ bill: bill, charge: charge, percentRatio: 0.4 });
    expect(charge.bill).toEqual(bill);
    expect(bill.modifiers.length).toEqual(1);
    expect(bill.charges.length).toEqual(1);
  });

  it('delete', ()=> {
    let charge = new Charge();
    expect(charge.delete()).toBeTruthy();
  });

  it('delete with bill', ()=> {
    let bill = new Bill();
    let charge = new Charge({ bill: bill });
    expect(bill.charges.length).toEqual(1);
    expect(charge.delete()).toBeTruthy();
    expect(bill.charges.length).toEqual(0);
  });

  it('delete with modifier bill', ()=> {
    let bill = new Bill();
    let charge = new Charge({ modifier: { bill: bill } });
    expect(bill.charges.length).toEqual(1);
    expect(bill.modifiers.length).toEqual(1);
    expect(charge.delete()).toBeTruthy();
    expect(bill.charges.length).toEqual(0);
    expect(bill.modifiers.length).toEqual(0);
  });

  it('cross bill modifier', ()=> {
    let bill = new Bill();
    expect(()=> {
      new Charge({ bill: bill, modifier: { bill: new Bill() } });
    }).toThrowError(ReferenceError);
  });

  it('matching bill modifier', ()=> {
    let bill = new Bill();
    expect(()=> {
      new Charge({ bill: bill, modifier: { bill: bill } });
    }).not.toThrowError(ReferenceError);
  });

  it('cross bill modify', ()=> {
    let bill = new Bill();
    let charge = new Charge({ bill: bill });
    expect(()=> {
      charge.modify({ bill: new Bill() });
    }).toThrowError(ReferenceError);
  });

  it('matching bill modify', ()=> {
    let bill = new Bill();
    let charge = new Charge({ bill: bill });
    expect(()=> {
      charge.modify({ bill: bill });
    }).not.toThrowError(ReferenceError);
  });
});