export declare type NumberOrFunction = Number | Function;

export interface IValidations {
  presence ?:boolean;
  greaterThan ?:NumberOrFunction;
  greaterThanOrEqualTo ?:NumberOrFunction;
  lessThan ?:NumberOrFunction;
}