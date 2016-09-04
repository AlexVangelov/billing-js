/// <reference path="../../../typings/index.d.ts" />

import { Charge } from './index';
import { Modifier } from '../modifier';

describe('Charge', () => {
  it('default values', () => {
    let charge = new Charge();
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
    let modifier = new Modifier();
    let charge = new Charge({ modifier: {} });
    expect(charge.modifier instanceof Modifier).toBeTruthy();
    expect(charge.modifier.charge).toEqual(charge);
  });
});