export interface IfCondition {
  if :Function,
  message :string
}

export declare type NumberOrFunction = Number | Function;
export declare type ConditionOrFunction = IfCondition | Function

export interface IValidations {
  presence ?:boolean;
  greaterThan ?:NumberOrFunction;
  greaterThanOrEqualTo ?:NumberOrFunction;
  invalid ?:ConditionOrFunction;
  lessThan ?:NumberOrFunction;
  notEqualTo ?:any;
}