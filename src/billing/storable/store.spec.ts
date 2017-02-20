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
    TestClass.initStore([{ id: 88, property: 'works' }]);
    let testClass = new TestClass();
    let test :TestClass;
    TestClass.find(88, (r)=> test = r);
    expect(test instanceof TestClass).toBeTruthy();
    expect(test.property).toEqual('works');
  });

  it('find', (done)=> {
    TestClass.initStore([
      { id: 100, property: 'One' },
      { id: 101, property: 'Two' }
    ]);
    new TestClass();
    let item :TestClass;
    TestClass.find(100, (r)=> item = r);
    expect(item instanceof TestClass).toBeTruthy();
    expect(item.property).toEqual('One');
    TestClass.find(101, (r)=> item = r);
    expect(item.property).toEqual('Two');
    done();
  });

  it('find non existing catch', (done)=> {
    TestClass.initStore([
      { id: 100, property: 'One' },
      { id: 101, property: 'Two' }
    ]);
    new TestClass();
    let item :TestClass;
    TestClass.find(99, (r)=> item = r).catch((err)=> {
      expect(err).toEqual(new Error('Not Found (TestClass#99)'));
      done();
    });
    expect(item).toBeUndefined();
  });

  it('find catchable', ()=> {
    TestClass.initStore([
      { id: 1, property: 'One' }
    ]);
    new TestClass();
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