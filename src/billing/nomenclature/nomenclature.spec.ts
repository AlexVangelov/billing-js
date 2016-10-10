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
      plus: [{ id: 1, code: '1', name: 'Test Plu', departmentId: 1, price: 1 }],
      currencies: []
    });
    expect(Plu.find(1)).toEqual({ id: 1, code: '1', name: 'Test Plu', departmentId: 1, price: 1 });
    expect(PaymentType.find(1)).toEqual({ id: 1, code: '1', name: 'Test PT', isCash: true, isFiscal: true });
  });
});