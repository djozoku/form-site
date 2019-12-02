/* eslint-disable no-plusplus */
import { Condition, FormDisplays } from '@form/interfaces/types/FormData';

export const parseCondition = (display: Condition, bool: boolean) => {
  if (bool) {
    switch (display.type) {
      case '&':
        return 'and';
      case '|':
        return 'or';
      default:
        return '';
    }
  }
  switch (display.type) {
    case '=':
    case '!=':
    case '>':
    case '<':
    case '<=':
    case '>=':
      break;
    default:
      return '';
  }
  if (display.fieldName === '' || display.data === '') return '';
  return display.type;
};

export const parseDataDisplay = async (display: FormDisplays): Promise<boolean> => {
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
    return parseDataDisplay(left) && parseDataDisplay(right);
  }
  if (
    display.type === 'count' &&
    !display.conditions.reduce<boolean>((acc, condition, i) => {
      if (i === 0) {
        return !!parseCondition(condition, false);
      }
      return acc && !!parseCondition(condition, i % 2 !== 0);
    }, false)
  )
    return false;
  return true;
};
