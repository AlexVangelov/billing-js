// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/// <reference path="../../../../typings/index.d.ts" />

import { ValidationModel } from './index';

describe('ValidationModel', () => {
  it('presence', function() {
    class TestModelPresence extends ValidationModel {
      property: number;
      constructor(property? :number) {
        super();
        this.property = property;
      }
    }
    TestModelPresence.validates('property', { presence: true });
    let testModel = new TestModelPresence();    
    expect(testModel.isValid).toEqual(false);
    expect(testModel.errors.property[0]).toEqual('blank');
    expect(testModel.errors.property.messages).toEqual(["can't be blank"]);
  });

  it('greatherThan', function() {
    class TestModeGreaterThan extends ValidationModel {
      property: number;
      constructor(property? :number) {
        super();
        this.property = property;
      }
    }
    TestModeGreaterThan.validates('property', { greaterThan: 2 });
    let testModel = new TestModeGreaterThan(-1);    
    expect(testModel.isValid).toEqual(false);
    expect(testModel.errors.property[0]).toEqual('greaterThan');
    expect(testModel.errors.property.messages).toEqual(["must be greater than 2"]);
  });

  it('greatherThan function', function() {
    class TestModeGreaterThanFunc extends ValidationModel {
      property: number;
      a: number = 1;
      b: number = 2;
      constructor(property? :number) {
        super();
        this.property = property;
      }
    }
    TestModeGreaterThanFunc.validates('property', { greaterThan: (self)=> { return self.a + self.b; } });
    let testModel = new TestModeGreaterThanFunc(-1);    
    expect(testModel.isValid).toEqual(false);
    expect(testModel.errors.property[0]).toEqual('greaterThan');
    expect(testModel.errors.property.messages).toEqual(["must be greater than 3"]);
  });
});