/// <reference path="../../../typings/index.d.ts" />

import { Modifier } from './index';
import { Charge } from '../charge';

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
});