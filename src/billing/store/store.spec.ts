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
  it('attach to a model', function() {
    let testClass = new TestClass({ store: [{ id: 100, property: 'works' }] });
    let test = <TestClass>TestClass.find(100);
    expect(test instanceof TestClass).toBeTruthy();
    expect(test.property).toEqual('works');
  });

  it('find', function() {
    new TestClass({ store: [
      { id: 100, property: 'One' },
      { id: 101, property: 'Two' }
    ]});
    expect(TestClass.find(99)).toBeUndefined();
    let item = <TestClass>TestClass.find(100);
    expect(item instanceof TestClass).toBeTruthy();
    expect(item.property).toEqual('One');
    item = <TestClass>TestClass.find(101);
    expect(item.property).toEqual('Two');
  });

  it('all', function() {
    new TestClass({ store: [
      { id: 100, property: 'One' },
      { id: 101, property: 'Two' }
    ]});
    let items = TestClass.all();
    expect(items.length).toEqual(2);
    expect((<any>items[0]).property).toEqual('One');
    expect((<any>items[1]).property).toEqual('Two');
  });
});