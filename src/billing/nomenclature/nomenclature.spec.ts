// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/// <reference path="../../../typings/index.d.ts" />

import { Nomenclature } from './index';
import { MemoryStore } from '../store';

describe('Nomenclature', ()=> {
  it('Default Memory Store', ()=> {
    let n = new Nomenclature({
      operators: [],
      taxGroups: [],
      paymentTypes: [],
      departments: [],
      plus: [],
      currencies: []
    });
    expect(n.operators instanceof MemoryStore).toBeTruthy();
    expect(n.taxGroups instanceof MemoryStore).toBeTruthy();
    expect(n.paymentTypes instanceof MemoryStore).toBeTruthy();
    expect(n.departments instanceof MemoryStore).toBeTruthy();
    expect(n.plus instanceof MemoryStore).toBeTruthy();
    expect(n.currencies instanceof MemoryStore).toBeTruthy();
  });
});