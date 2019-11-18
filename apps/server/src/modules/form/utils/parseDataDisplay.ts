/* eslint-disable no-plusplus */
import { DeepPartial } from 'ts-essentials';
import { Condition, FormDisplays } from '@form/interfaces/types/FormData';

const parseCondition = (display: Condition) => {
  switch (display.conditionType) {
    case '!=':
      return 'not';
    case '=':
      return 'equals';
    case '&':
      return 'and';
    case '|':
      return 'or';
    default:
      return '';
  }
};

export const parseDataDisplay = (
  display: FormDisplays | DeepPartial<FormDisplays>
): FormDisplays | false => {
  if (!display.type || (display.type !== 'calculation' && display.type !== 'count')) return false;
  if (display.type === 'calculation') {
    const { left, operation, right } = display;
    if (
      !left ||
      !left.type ||
      left.type === 'calculation' ||
      left.type !== 'count' ||
      !operation ||
      !right
    )
      return false;
    if (!parseCondition(left.conditions![0] as Condition)) return false;
  }
  return false;
};
