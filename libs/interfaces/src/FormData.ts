export type FormFieldDatabaseType = 'text' | 'int' | 'real' | 'bool';
export type FormFieldInputType = 'checkbox' | 'radio' | 'select' | 'text' | 'number' | 'date';
export type FormFieldDataType = 'date' | 'string' | 'number' | 'boolean';

export interface FormField {
  name: string;
  displayName: string;
  databaseType: FormFieldDatabaseType;
  dataType: FormFieldDataType;
  inputType: FormFieldInputType;
  options?: string[];
}

export interface FormDisplay<T> {
  type: T;
}

export interface CalculationDisplay<Left extends FormDisplay<any>, Right extends FormDisplay<any>>
  extends FormDisplay<'calculation'> {
  operation: '+' | '-' | '*' | '/' | '%';
  left: Left;
  right: Right;
}

export type BooleanConditionTypes = '&' | '|';

export type ValueConditionTypes = '=' | '<' | '>' | '<=' | '>=' | '!=';

export interface BaseCondition<T> {
  conditionType: T;
}

export type BooleanCondition = BaseCondition<BooleanConditionTypes>;

export interface ValueCondition extends BaseCondition<ValueConditionTypes> {
  fieldName: string;
  data: string | number | boolean;
}

export type Condition = ValueCondition | BooleanCondition;

export interface CountDisplay extends FormDisplay<'count'> {
  conditions: Condition & ValueCondition[];
}

export type FormDisplays = CalculationDisplay<FormDisplays, FormDisplays> | CountDisplay;

export interface FormDataDisplay {
  name: string;
  displayName: string;
  display: FormDisplays;
}

export interface FormData {
  displayName?: string;
  fields: FormField[];
  dataDisplay: FormDataDisplay[];
}
