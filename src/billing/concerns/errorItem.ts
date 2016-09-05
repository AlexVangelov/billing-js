// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

/**
 * 
 * 
 * @export
 * @abstract
 * @class ErrorItem
 */
export abstract class ErrorItem {
  /**
   * 
   * 
   * @static
   */
  static MAP = {
    accepted: "must be accepted",
    blank: "can't be blank",
    present: "must be blank",
    confirmation: "doesn't match %{attribute}",
    empty: "can't be empty",
    equal_to: "must be equal to %{count}",
    even: "must be even",
    exclusion: "is reserved",
    greater_than: "must be greater than %{count}",
    greater_than_or_equal_to: "must be greater than or equal to %{count}",
    inclusion: "is not included in the list",
    invalid: "is invalid",
    less_than: "must be less than %{count}",
    less_than_or_equal_to: "must be less than or equal to %{count}",
    model_invalid: "Validation failed: %{errors}",
    not_a_number: "is not a number",
    not_an_integer: "must be an integer",
    odd: "must be odd",
    required: "must exist",
    taken: "has already been taken",
  }
}