// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/// <reference path="../../typings/index.d.ts" />

import { Bill } from './bill';

describe('Bill', ()=> {
  it('init', () => {
    let bill = new Bill();
    expect(bill.charges.getBill()).toEqual(bill);
    expect(bill.modifiers.getBill()).toEqual(bill);
    expect(bill.payments.getBill()).toEqual(bill);
  });

  it('total', ()=> {
    let bill = new Bill();
    //1 charge (5)
    expect(bill.total()).toEqual(0);
    bill.charges.new({ price: 5 });
    expect(bill.charges.length).toEqual(1);
    expect(bill.total()).toEqual(5);
    //2 charge (5+2)
    bill.charges.new({ price: 2 });
    expect(bill.charges.length).toEqual(2);
    expect(bill.total()).toEqual(7);
    //3 charge (7+5) + 1 mod (2)
    bill.charges.new({ price: 5, modifier: { fixedValue: 2 }});
    expect(bill.charges.length).toEqual(3);
    expect(bill.modifiers.length).toEqual(1);
    expect(bill.charges.sum()).toEqual(12);
    expect(bill.modifiers.sum()).toEqual(2);
    expect(bill.total()).toEqual(14);
    //2 mod (global) 50% of 14
    bill.modifiers.new({ percentRatio: -0.5 });
    expect(bill.charges.length).toEqual(3);
    expect(bill.modifiers.length).toEqual(2);
    expect(bill.total()).toEqual(7);
  });
});