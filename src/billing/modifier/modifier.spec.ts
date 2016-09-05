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
    expect(modifier.value()).toBeUndefined();
    modifier = new Modifier({ fixedValue: 0.3 });
    expect(modifier.value()).toBeUndefined();
  });

  it('charge percent', ()=> {
    let charge = new Charge({ qty: 2, price: 10.5 });
    let modifier = new Modifier({ charge: charge, percentRatio: 0.3 });
    expect(modifier.value()).toEqual((21 * 30 ) / 100);
  });

  it('charge fixed', ()=> {
    let charge = new Charge({ qty: 2, price: 10.5 });
    let modifier = new Modifier({ charge: charge, fixedValue: 0.3 });
    expect(modifier.value()).toEqual(0.3);
  });

  it('global percent', ()=> {
    let bill = new Bill();
    bill.charges.new({ price: 14 });
    expect(bill.total()).toEqual(14);
    let modifier = new Modifier({ bill: bill, percentRatio: -0.5});
    expect(modifier.value()).toEqual(-7);
  });

  it('global fixed', ()=> {
    let bill = new Bill();
    let modifier = new Modifier({ bill: bill, fixedValue: 0.3 });
    expect(modifier.value()).toEqual(0.3);
  });

  it('global percent with mod charge fixed', ()=> {
    let bill = new Bill();
    bill.charges.new({ price: 5, modifier: { fixedValue: 2}});
    let modifier = new Modifier({ bill: bill, fixedValue: 0.3 });
    expect(modifier.value()).toEqual(0.3);
  });

  it('global percent with mod charge percent', ()=> {
    let bill = new Bill();
    let charge = bill.charges.new({ price: 8, modifier: { percentRatio: 0.5 }});
    expect(charge.value()).toEqual(8);
    expect(bill.total()).toEqual(12);
    let modifier = new Modifier({ bill: bill, percentRatio: 0.5 });
    expect(modifier.value()).toEqual(6);
  });
});