// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/// <reference path="../../../typings/index.d.ts" />

import * as Nomenclature from './index';
import { MemoryStore } from '../storable';

describe('Nomenclature', ()=> {
  it('stores', function() {
    Nomenclature.init({
      operators: [],
      taxGroups: [],
      paymentTypes: [{ id: 1, code: '1', name: 'Test PT', isCash: true, isFiscal: true }],
      departments: [],
      plus: [{ id: 1, code: '2', name: 'Test Plu', departmentId: 3, price: 4 }]
    });
    let plu :Nomenclature.Plu;
    Nomenclature.Plu.find(1, (r)=> plu = r );
    expect(plu instanceof Nomenclature.Plu).toBeTruthy();
    expect([plu.id, plu.code, plu.name, plu.departmentId, plu.price]).toEqual([1, '2', 'Test Plu',3, 4]);
  });
});