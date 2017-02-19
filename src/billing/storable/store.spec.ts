// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Storable } from './index';

class TestClass extends Storable {
  property :string;
  constructor(a :any = {}) {
    super(a);
    this.property = a.property;
  }
}

describe('Storable', ()=> {
  it('attach to a model', function() {
    let testClass = new TestClass({ store: [{ id: 100, property: 'works' }] });
    let test :TestClass;
    TestClass.find(100, (r)=> test = r);
    expect(test instanceof TestClass).toBeTruthy();
    expect(test.property).toEqual('works');
  });

  it('find', (done)=> {
    new TestClass({ store: [
      { id: 100, property: 'One' },
      { id: 101, property: 'Two' }
    ]});
    let item :TestClass;
    TestClass.find(100, (r)=> item = r);
    expect(item instanceof TestClass).toBeTruthy();
    expect(item.property).toEqual('One');
    TestClass.find(101, (r)=> item = r);
    expect(item.property).toEqual('Two');
    done();
  });

  it('find non existing catch', (done)=> {
    new TestClass({ store: [
      { id: 100, property: 'One' },
      { id: 101, property: 'Two' }
    ]});
    let item :TestClass;
    TestClass.find(99, (r)=> item = r).catch((err)=> {
      expect(err).toEqual(new Error('Not Found'));
      done();
    });
    expect(item).toBeUndefined();
  });

  it('find catchable', ()=> {
    new TestClass({ store: [
      { id: 1, property: 'One' }
    ]});
    let catchable = TestClass.find(1,()=>{});
    expect(catchable.catch).toBeDefined();
  });

  // it('all', ()=> {
  //   new TestClass({ store: [
  //     { id: 100, property: 'One' },
  //     { id: 101, property: 'Two' }
  //   ]});
  //   let items :any
  //   TestClass.all((rs)=> items = rs);
  //   expect(items.length).toEqual(2);
  //   expect((<any>items[0]).property).toEqual('One');
  //   expect((<any>items[1]).property).toEqual('Two');
  // });
});