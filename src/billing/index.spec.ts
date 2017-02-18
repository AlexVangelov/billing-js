// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Billing } from './index';
import { Bill } from './bill';

describe('Billing', ()=> {
  it('config', ()=> {
    Billing.config();
  });

  it('bills', ()=> {
    let billsCount = Billing.bills.length;
    let bill = Billing.bills.new();
    expect(bill instanceof Bill).toBeTruthy();
    expect(Billing.bills.length).toEqual(billsCount+1);
  });

  it('new bill from collection with params', ()=> {
    let bill = Billing.bills.new({ operatorId: 1 });
    expect(bill.operatorId).toEqual(1);
  });
});