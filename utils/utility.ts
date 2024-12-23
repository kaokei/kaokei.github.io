import { useDayjs } from '#imports';

const dayjs = useDayjs();

export function value2label(
  value: string | number,
  list: any[],
  defaultValue = '',
) {
  for (const item of list) {
    if (item.value === value) {
      return item.label;
    }
  }
  return defaultValue;
}

export function label2value(
  label: string | number,
  list: any[],
  defaultValue = '',
) {
  for (const item of list) {
    if (item.label === label) {
      return item.value;
    }
  }
  return defaultValue;
}

export function hasOwn(obj: any, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
export function hasOwnName(obj: any) {
  return hasOwn(obj, 'name');
}
export function hasOwnId(obj: any) {
  return hasOwn(obj, 'id');
}
export function hasOwnLabel(obj: any) {
  return hasOwn(obj, 'label');
}
export function hasOwnValue(obj: any) {
  return hasOwn(obj, 'value');
}

/**
 * 把id-name的数组转换为value-label数组
 */
export function transformToLabelValue(list: any[]) {
  return list.map((item: any) => ({
    label: hasOwnName(item) ? item.name : item.label,
    value: hasOwnId(item) ? item.id : item.value,
  }));
}

/**
 * 把value-label的数组转换为id-name数组
 */
export function transformToIdName(list: any[]) {
  return list.map((item) => ({
    name: hasOwnLabel(item) ? item.label : item.name,
    id: hasOwnValue(item) ? item.value : item.id,
  }));
}

function pad(n: number) {
  return n < 10 ? `0${n}` : n;
}

/**
 * 格式化时间到时分秒 HH:mm:ss
 * @param time number
 * @returns
 */
export function formatSecond(time: number) {
  if (time) {
    const s = time % 60;
    const totalMinutes = (time - s) / 60;
    const m = totalMinutes % 60;
    const h = (totalMinutes - m) / 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  return '00:00:00';
}

/**
 * 格式化时间到天 YYYY-MM-DD
 * @param time number
 * @returns
 */
export function formatDateToDay(time: number) {
  if (time) {
    return dayjs(time).format('YYYY-MM-DD');
  }
  return '';
}

/**
 * 格式化时间到分钟 MM/DD HH:mm
 * @param time number
 * @returns
 */
export function formatDateToMonthDayTime(time: number) {
  if (time) {
    return dayjs(time).format('MM/DD HH:mm');
  }
  return '';
}

/**
 * 格式化时间到年月日时分秒 YYYY-MM-DD HH:mm:ss
 * @param time number
 * @returns
 */
export function formatDateToSecond(time: number) {
  if (time) {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
  }
  return '';
}

export function formatStartEnd(start: number, end: number) {
  let res = '';
  if (start) {
    res += dayjs(start).format('YYYY年MM月DD日 HH:mm');
  }
  if (end) {
    res += dayjs(end).format('-HH:mm');
  }
  return res;
}

/**
 * 格式化时间到年月日时分 YYYY-MM-DD HH:mm
 * @param time number
 * @param time number
 * @returns
 */
export function formatDateToMinuteV2(time: number) {
  if (time) {
    return dayjs(time).format('YYYY-MM-DD HH:mm');
  }
  return '';
}

/**
 * 格式化时间到一天的开始和结束，避免时间戳因为毫秒导致不准确
 * @param arr Dayjs[]
 * @returns
 */
export function dayjs2time(arr: any[]) {
  const m1 = arr && arr[0];
  const m2 = arr && arr[1];
  if (m1 && m2) {
    const t1 = m1.startOf('day').valueOf();
    const t2 = m2.endOf('day').valueOf();
    return [t1, t2];
  }
  return [];
}

/**
 * model转to中使用
 * 提交搜索表单中日期范围属性的序列化函数
 * 主要是要使用startOf和endOf方法处理时间
 * @param beginName string
 * @param endName string
 * @returns
 */
export function createDayjsRangeStartOfEndOfParser(
  beginName: string,
  endName: string,
) {
  return function (dayjsArr: any[]) {
    const timeArr = dayjs2time(dayjsArr);
    if (timeArr && timeArr.length) {
      return {
        [beginName]: timeArr[0],
        [endName]: timeArr[1],
      };
    }
    return {};
  };
}

/**
 * model中日期范围属性的序列化函数
 * @param arr Dayjs[]
 * @returns
 */
export function dayjsRangeStringifier(arr: any[]) {
  if (arr && arr.length === 2) {
    return arr.map((item) => item.valueOf());
  }
  return [];
}

/**
 * model中日期范围属性的反序列化函数
 * @param arr number[]
 * @returns
 */
export function dayjsRangeParser(arr: number[]) {
  if (arr && arr.length === 2) {
    return arr.map((item) => dayjs(item));
  }
  return [];
}

/**
 * model转to中使用
 * model中日期属性的序列化函数-startOf
 * 重置毫秒数为000
 * @param name string
 * @returns
 */
export function createDayjsSingleStartOfParser(name: string) {
  return function (d: any) {
    if (d) {
      const newd = dayjs(d);
      return {
        [name]: newd.startOf('second').valueOf(),
      };
    }
    return {};
  };
}

/**
 * model中日期属性的序列化函数
 * @param d Dayjs
 * @returns
 */
export function dayjsSingleStringifier(d: any) {
  if (d) {
    return dayjs(d).valueOf();
  }
}

/**
 * model中日期属性的反序列化函数
 * @param t number
 * @returns
 */
export function dayjsSingleParser(t: number) {
  return t && dayjs(t);
}

/**
 * model转to中使用
 * model中数组序列化为逗号分隔的字符串
 * @param name string
 * @returns
 */
export function createArray2StringParser(name: string) {
  return function (arr: any[]) {
    if (arr && arr.length) {
      return {
        [name]: arr.join(','),
      };
    }
    return {};
  };
}

export function createExcludeFilterParser(excludeList: any[]) {
  return function (value: string | number) {
    if (excludeList.includes(value)) {
      return undefined;
    }
    return value;
  };
}
export function createObjectArray2StringParser(
  name: string,
  key: string,
  excludeList: any,
) {
  return function (arr: any[]) {
    const validItems =
      typeof excludeList === 'undefined'
        ? arr
        : arr?.filter((item) => !excludeList.includes(item[key]));
    if (validItems && validItems.length) {
      return {
        [name]: validItems.map((item) => item[key]).join(','),
      };
    }
    return {};
  };
}

/**
 * 抹掉毫秒数
 * @param d any
 * @returns
 */
export function getStartOfSecond(d: any) {
  if (d) {
    return dayjs(+d).startOf('second').valueOf();
  }
}

/**
 * select 通用本地搜索逻辑
 * @param inputString string
 * @param option any
 * @returns
 */
export function commonFilterOption(inputString: string, option: any) {
  return (
    (option.label as string)
      ?.toLowerCase()
      .indexOf(inputString.toLowerCase()) >= 0
  );
}

export function getUTCTimeZone() {
  const offset = new Date().getTimezoneOffset();
  const zone = offset / 60;
  if (zone > 0) {
    return `UTC${-zone}`;
  } else {
    return `UTC+${-zone}`;
  }
}

/**
 * 保留数组引用，只是替换数组内容
 * @param target
 * @param newArray
 */
export function replaceArray(target: any[], newArray: any[]) {
  target.splice(0, target.length, ...newArray);
  return target;
}

/**
 * 延迟执行
 * @param time number
 * @returns
 */
export function delay(time: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function parseInt10(value: any) {
  return parseInt(value, 10);
}

// 表格分页的默认总条数说明
export const PAGINATION_SHOW_TOTAL = (total: any) => `共 ${total} 条`;

const SECONDS_IN_DAY = 24 * 60 * 60;
const SECONDS_IN_HOUR = 60 * 60;

export function createObject2QueryStringParser(pickKey = 'id') {
  return function (arr: any[]) {
    return Array.from(new Set(arr.map((item) => item[pickKey]))).join(',');
  };
}

export function createQueryString2ObjectParser(pickKey = 'id') {
  return function (str: string) {
    return Array.from(new Set(str.split(','))).map((item) => ({
      [pickKey]: parseInt(item),
    }));
  };
}
