// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

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
    expect(testModel.errors[0]['property']).toEqual({ blank: "can't be blank" });
    expect(testModel.errors.messages[0]).toEqual("Property can't be blank");
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
    let testModel = new TestModeGreaterThan(2);    
    expect(testModel.isValid).toEqual(false);
    expect(testModel.errors[0]['property']).toEqual({ greaterThan: "must be greater than 2" });
    expect(testModel.errors.messages[0]).toEqual("Property must be greater than 2");
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
    expect(testModel.errors[0]['property']).toEqual({ greaterThan: 'must be greater than 3' });
    expect(testModel.errors.messages[0]).toEqual("Property must be greater than 3");
  });

  it('greatherThanOrequalTo', function() {
    class TestModeGreaterThanOrEqualTo extends ValidationModel {
      property: number;
      constructor(property? :number) {
        super();
        this.property = property;
      }
      get getter() {
        return this.property;
      }
    }
    TestModeGreaterThanOrEqualTo.validates('getter', { greaterThanOrEqualTo: 2 });
    let testModel = new TestModeGreaterThanOrEqualTo(-1);    
    expect(testModel.isValid).toEqual(false);
    expect(testModel.errors[0]['getter']).toEqual({ greaterThanOrEqualTo: 'must be greater than or equal to 2' });
    expect(testModel.errors.messages[0]).toEqual("Getter must be greater than or equal to 2");
  });
});