// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/// <reference path="../../../typings/index.d.ts" />

import { Nomenclature, Plu, PaymentType } from './index';
import { MemoryStore } from '../store';

describe('Nomenclature', ()=> {
  it('stores', function() {
    Nomenclature.init({
      operators: [],
      taxGroups: [],
      paymentTypes: [{ id: 1, code: '1', name: 'Test PT', isCash: true, isFiscal: true }],
      departments: [],
      plus: [{ id: 1, code: '2', name: 'Test Plu', departmentId: 3, price: 4 }],
      currencies: []
    });
    let plu = <Plu>Plu.find(1);
    expect(plu instanceof Plu).toBeTruthy();
    expect([plu.id, plu.code, plu.name, plu.departmentId, plu.price]).toEqual([1, '2', 'Test Plu',3, 4]);
    //expect(PaymentType.find(1)).toEqual({ id: 1, code: '1', name: 'Test PT', isCash: true, isFiscal: true });
  });
});