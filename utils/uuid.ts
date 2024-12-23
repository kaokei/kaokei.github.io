import { nanoid } from 'nanoid';

export function uuid(len = 21) {
  return nanoid(len);
}
