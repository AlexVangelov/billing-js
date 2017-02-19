// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IValidations } from './interface';
import { ValidationErrors } from './validationErrors';
import { Storable } from '../../storable';

export declare type MapKeyOrMessage = String | { [key :string] :string };

/**
 * 
 * 
 * @export
 * @abstract
 * @class ValidationModel
 */
export abstract class ValidationModel extends Storable {
  private static _validations: { [className: string]: { [property: string]: IValidations } } = {};

  private _errors :ValidationErrors;
  /**
   * 
   * 
   * @static
   */
  protected static MAP = {
    accepted: "must be accepted",
    blank: "can't be blank",
    present: "must be blank",
    confirmation: "doesn't match %{attribute}",
    empty: "can't be empty",
    equal_to: "must be equal to %{count}",
    even: "must be even",
    exclusion: "is reserved",
    greaterThan: "must be greater than %{count}",
    greaterThanOrEqualTo: "must be greater than or equal to %{count}",
    inclusion: "is not included in the list",
    invalid: "is invalid",
    less_than: "must be less than %{count}",
    less_than_or_equal_to: "must be less than or equal to %{count}",
    model_invalid: "Validation failed: %{errors}",
    not_a_number: "is not a number",
    not_an_integer: "must be an integer",
    notEqualTo: "must be different from %{value}",
    odd: "must be odd",
    required: "must exist",
    taken: "has already been taken",
  }

  static validates(property: string, validations: IValidations) {
    let className = (<any>this).name;
    if (!this._validations[className]) this._validations[className] = {};
    this._validations[className][property] = validations;
  }

  addError(property: string, keyOrMessage :MapKeyOrMessage = '', params: any = {}) {
    let mapKey :string;
    let message :string;
    if (!this._errors) this._errors = new ValidationErrors(property);
    if (typeof keyOrMessage === 'string') {
      mapKey = <string>keyOrMessage;
      message = (ValidationModel.MAP[mapKey]).replace(/%{(\w+)}/g, (s, p1) => { return params[p1]; });
    } else {
      mapKey = (<any>keyOrMessage).mapKey;
      message = (<any>keyOrMessage).message;
    }
    this._errors.add(property, mapKey, message);
  }

  get errors(): any {
    return this._errors;
  }

  get isValid(): boolean {
    delete this._errors;
    let modelValidations = ValidationModel._validations[(<any>this.constructor).name];
    for (let property in modelValidations) {
      let validations = modelValidations[property]
      for (let v in validations) {
        switch (v) {
          case 'presence':
            if (typeof(this[property]) != 'number' && !this[property]) this.addError(property, 'blank');
            break;
          case 'greaterThan': {
            let count = (validations.greaterThan instanceof Function) ? validations.greaterThan(this) : validations.greaterThan;
            if (this[property] <= count) this.addError(property, 'greaterThan', { count: count });
          } break;
          case 'greaterThanOrEqualTo': {
            let count = (validations.greaterThanOrEqualTo instanceof Function) ? validations.greaterThanOrEqualTo(this) : validations.greaterThanOrEqualTo;
            if (this[property] < count) this.addError(property, 'greaterThanOrEqualTo', { count: count });
          } break;
          case 'invalid': {
            if (validations.invalid instanceof Boolean) {
              if (validations.invalid) this.addError(property, 'invalid');
            } else if (validations.invalid instanceof Function) {
              if (validations.invalid(this)) this.addError(property, 'invalid');
            } else {
              if (validations.invalid.if && validations.invalid.if(this)) this.addError(property, validations.invalid.message ? { mapKey: 'invalid', message: validations.invalid.message } : 'invalid');
            }
          } break;
          case 'lessThan': {
            let count = (validations.lessThan instanceof Function) ? validations.lessThan(this) : validations.greaterThan;
            if (this[property] >= count) this.addError(property, 'greaterThan', { count: count });
          } break;
          case 'notEqualTo':
            let value = (validations.notEqualTo instanceof Function) ? validations.notEqualTo(this) : validations.notEqualTo;
            if (this[property] === value) this.addError(property, 'notEqualTo', { value: value });
            break;
        }
      }
    }
    return !this._errors;
  }
}