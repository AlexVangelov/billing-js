// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/// <reference path="../../../typings/index.d.ts" />

import { Store } from './index';

class TestClass extends Store {
  property :string;
  constructor(a :any = {}) {
    super(a);
    this.property = a.property;
  }
}

describe('Store', ()=> {
  it('stores', function() {
    let testClass = new TestClass({ store: [{ id: 100, property: 'works' }] });
    let test = <TestClass>TestClass.find(100);
    expect(test instanceof TestClass).toBeTruthy();
    expect(test.property).toEqual('works');
  });
});