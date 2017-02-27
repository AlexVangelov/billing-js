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

  it('config with nomenclature', ()=> {
    expect(()=> Billing.config({ nomenclature: {} }) ).not.toThrow(); 
  });

  it('config callback', ()=> {
    let configDone = {
      cb: ()=> {}
    };
    spyOn(configDone, 'cb');
    Billing.config({}, configDone.cb);
    expect(configDone.cb).toHaveBeenCalled();
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