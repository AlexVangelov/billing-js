// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/// <reference path="../../../typings/index.d.ts" />

import { Charge } from './index';
import { Modifier } from '../modifier';
import { Bill } from '../bill';

import * as Nomenclature from '../nomenclature';

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
    expect(charge.value).toEqual(1.12);
  });

  it('value with qty', ()=> {
    let charge = new Charge({ qty: 2, price: 1.12 });
    expect(charge.value).toEqual(2.24);
    charge.qty = 1.5;
    expect(Math.round(charge.value * 100) / 100).toEqual(1.68);
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
    expect(modifier.value).toEqual(3);
  });

  it('modify percent', ()=> {
    let charge = new Charge({ qty: 3, price: 4});
    let modifier = charge.modify({ percentRatio: 0.4 });
    expect(Math.round(modifier.value * 100) / 100).toEqual((12 * 40) / 100);
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
    let modifier = charge.modify({});
    expect(modifier.value).toEqual(0);
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

  describe('validations', function() {
    it('require bill', function() {
      let charge = new Charge({ price: 1 });
      expect(charge.isValid).toBeFalsy();
      expect(charge.errors.messages).toContain("Bill can't be blank");
    });

    it('require positive price', function() {
      let charge = new Charge({ price: -1 });
      expect(charge.isValid).toBeFalsy();
      expect(charge.errors.messages).toContain('Price must be greater than 0');
    });
  });

  describe('nomenclature', function() {
    beforeAll(function() {
      Nomenclature.init({
        plus: [{ id: 1, code: '1', name: 'Test Plu', description: 'Descr', departmentId: 1, price: 1.5 }],
        taxGroups: [{ id: 1, code: '1', name: '20%', percentRatio: 0.2 }],
      })
    });

    it('inherit attributes from Plu', function() {
      let charge = new Charge({ pluId: 1 });
      expect(charge.name).toEqual('Test Plu');
      expect(charge.description).toEqual('Descr');
      expect(charge.price).toEqual(1.5);
    });

    it('inherit attributes from TaxGroup', function() {
      let charge = new Charge({ taxGroupId: 1 });
      expect(charge.taxRatio).toEqual(0.2);
    });

    it('own attributes takes precedence over relations', function() {
      let charge = new Charge({ name: 'My Name', description: 'My Descriprion', price: 45, taxRatio: 0.09 });
      charge.pluId = 1;
      expect(charge.plu.name).toEqual('Test Plu');
      expect(charge.name).toEqual('My Name');
      expect(charge.description).toEqual('My Descriprion');
      expect(charge.price).toEqual(45);
      charge.taxGroupId = 1;
      expect(charge.taxGroup.percentRatio).toEqual(0.2);
      expect(charge.taxRatio).toEqual(0.09);
    });
  });
});