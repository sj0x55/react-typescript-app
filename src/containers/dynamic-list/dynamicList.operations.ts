import { join, isString } from 'lodash';

export function prepareValue(value: unknown, { prefix, suffix }: KeyValObj = {}): string {
  const noneValue = '-';

  if (isString(value)) {
    value = value.trim();
  }

  if (value) {
    return join([prefix, value, suffix], '').trim();
  } else {
    return noneValue;
  }
}
