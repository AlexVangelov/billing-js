// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bill } from './bill';
import * as Nomenclature from './nomenclature';

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

  it('global modifier', ()=> {
    let bill = new Bill();
    bill.charges.new({ price: 21, modifier: { fixedValue: 1 } });
    let globalModifier = bill.modifiers.new({ percentRatio: -0.5 });
    expect(bill.modifiers.length).toEqual(2);
    expect(bill.modifier).toEqual(globalModifier);
  });

  it('toJson', ()=> {
    let bill = new Bill();
    bill.charges.new({ price: 1, modifier: { fixedValue: 1 } });
    bill.modifiers.new({ percentRatio: -0.5 });
    bill.payments.new();
    expect(bill.toJson()).toEqual({
      charges: [ { qty: 1, price: 1, name: '', modifier: { fixedValue: 1 } } ],
      payments: [ { name: '', value: 1, isCash: true, isFiscal: true } ],
      modifier: { percentRatio: -0.5 }
    });
  });

  it('toJson (empty)', ()=> {
    let bill = new Bill();
    expect(bill.toJson()).toEqual({});
  });

  it('toJson (invalid)', ()=> {
    let bill = new Bill();
    bill.charges.new({ price: -1 });
    bill.modifiers.new({ fixedValue: -1 });
    bill.payments.new({ value: -1 });
    expect(bill.toJson()).toBeUndefined();
  });

  it('get operator', ()=> {
    Nomenclature.init({
      operators: [ 
        { id: 1, code: '1', name: 'Operator1' },
        { id: 2, name: 'Operator2' }
      ]
    });
    let bill = Bill.new();
    expect(bill.operator).toBeUndefined();
    bill = Bill.new({ operatorId: 1 });
    expect(bill.operator.name).toEqual('Operator1');
    expect(bill.operator.code).toEqual('1');
  });

  it('extends Storable', ()=> {
    expect(Bill.initStore).toBeDefined();
  });
  
  describe('store', ()=> {
    beforeAll((done)=> {
      Bill.initStore(null, null, (err)=> {
        if(!err) done();
      });
    });
    it('save', ()=>{
      let bill = Bill.new();
      bill.charges.new({ price: 13 });
      expect(()=> { bill.save() }).not.toThrow();
      expect(bill.save()).toBeTruthy();
    });

    it('save invalid', ()=>{
      let bill = Bill.new();
      bill.charges.new({ price: -1 });
      expect(()=> { bill.save() }).not.toThrow();
      expect(bill.save()).toBeFalsy();
    });
  });

});