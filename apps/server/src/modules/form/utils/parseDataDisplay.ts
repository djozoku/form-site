/* eslint-disable no-plusplus */
import { Condition, FormDisplays } from '@form/interfaces/types/FormData';

const parseCondition = (display: Condition) => {
  switch (display.type) {
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

export const parseDataDisplay = (display: FormDisplays): FormDisplays | false => {
  if (!display.type || (display.type !== 'calculation' && display.type !== 'count')) return false;
  if (display.type === 'calculation') {
    const { left, operation, right } = display;
    if (
      !left ||
      !left.type ||
      !(left.type === 'calculation' || left.type === 'count') ||
      !operation ||
      !right ||
      !right.type ||
      !(right.type === 'calculation' || right.type === 'count')
    )
      return false;
    if (left.type === 'count' && !parseCondition(left.conditions![0])) return false;
  }
  return false;
};
