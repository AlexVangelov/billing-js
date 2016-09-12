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
    TestModelPresence.validate('property', { presence: true });
    let testModel = new TestModelPresence();    
    expect(testModel.isValid).toEqual(false);
    expect(testModel.errors.property[0].error).toEqual('blank');
    expect(testModel.errors.property[0].message).toEqual("can't be blank");
  });

  it('greatherThan', function() {
    class TestModeGreaterThan extends ValidationModel {
      property: number;
      constructor(property? :number) {
        super();
        this.property = property;
      }
    }
    TestModeGreaterThan.validate('property', { greaterThan: 2 });
    let testModel = new TestModeGreaterThan(-1);    
    expect(testModel.isValid).toEqual(false);
    expect(testModel.errors.property[0].error).toEqual('greaterThan');
    expect(testModel.errors.property[0].message).toEqual("must be greater than 2");
  });
});