// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bill } from './bill';

describe('Bill', ()=> {
  it('init', () => {
    let bill = new Bill();
    expect(bill.charges.bill).toEqual(bill);
    expect(bill.modifiers.bill).toEqual(bill);
    expect(bill.payments.bill).toEqual(bill);
  });

  it('total', ()=> {
    let bill = new Bill();
    //1 charge (5)
    expect(bill.total).toEqual(0);
    bill.charges.new({ price: 5 });
    expect(bill.charges.length).toEqual(1);
    expect(bill.total).toEqual(5);
    //2 charge (5+2)
    bill.charges.new({ price: 2 });
    expect(bill.charges.length).toEqual(2);
    expect(bill.total).toEqual(7);
    //3 charge (7+5) + 1 mod (2)
    bill.charges.new({ price: 5, modifier: { fixedValue: 2 }});
    expect(bill.charges.length).toEqual(3);
    expect(bill.modifiers.length).toEqual(1);
    expect(bill.charges.sum()).toEqual(12);
    expect(bill.modifiers.sum()).toEqual(2);
    expect(bill.total).toEqual(14);
    //2 mod (global) 50% of 14
    bill.modifiers.new({ percentRatio: -0.5 });
    expect(bill.charges.length).toEqual(3);
    expect(bill.modifiers.length).toEqual(2);
    expect(bill.total).toEqual(7);
  });

  it('custom error message format', function() {
    let bill = new Bill();
    let charge = bill.charges.new({ price: -2 });
    expect(charge.isValid).toBeFalsy();
    expect(charge.errors[0]).toEqual({ price: { greaterThan: 'must be greater than 0' } });
    expect(charge.errors[1]).toEqual({ finalValue: { greaterThanOrEqualTo: 'must be greater than or equal to 0' } });
    
    expect(bill.isValid).toBeFalsy();
    expect(bill.errors[0]).toEqual({ charges: Object({ invalid: 'are invalid' }) });
  });
});