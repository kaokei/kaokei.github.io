export interface Pagination<T> {
  total: number;
  size: number;
  current: number;
  records: T[];
}

export interface SelectOption {
  label: string;
  value: string | number;
  children?: SelectOption[];
}

export type MakeIdOptional<T> = 'id' extends keyof T
  ? Omit<T, 'id'> & { id?: number }
  : T;
