// 分页查询的默认参数key
export const QUERY_KEY_FOR_MODEL = 'q';

// 8-18位，至少包含数字和字母
export const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,18}$/;

// 性别选项
export const SEX_OPTIONS = [
  { label: '保密', value: 'secrecy' },
  { label: '男生', value: 'boy' },
  { label: '女生', value: 'girl' },
];
