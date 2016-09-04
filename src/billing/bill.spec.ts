/// <reference path="../../typings/index.d.ts" />

import { Bill } from './bill';

describe('Bill', () => {
  it('init', () => {
    let bill = new Bill();
    expect(bill.charges.bill).toEqual(bill);
  });
});