import * as utils from './index'; // import this file into itself to default export everything
export default utils;

// import throttle from 'lodash/throttle';
// import debounce from 'lodash/debounce';
// import range from 'lodash/range';
// import orderBy from 'lodash/orderBy';
// import memoize from 'lodash/memoize';
// import uniqBy from 'lodash/uniqBy';
// import xor from 'lodash/xor';
// import clone from 'lodash/clone';
// import difference from 'lodash/difference';

// export { difference, memoize, orderBy, range, debounce, throttle, xor, uniqBy, clone };

export const isFunction = (fn: any) => typeof fn === 'function';
export const isNumber = (n: any) => typeof n === 'number';
export const isObjectEmpty = (o: any) => Object.entries(o).length === 0 && o.constructor === Object;
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
// @ts-ignore
export const uniqArr = (arr: any[]) => [...new Set(arr)];
export const formatNumber = (num: number) => (!Number.isNaN(Number(num)) ? Number(num).toLocaleString() : num);
export const randomBetween = (a: number, b: number) => Math.floor(Math.random() * (b - a)) + a;
export const randomStr = (len: number = 5) =>
  Math.random()
    .toString(36)
    .substr(2, len + 2);

export function validateDate(dateStr: string) {
  const regExp = /^(\d\d?)\/(\d\d?)\/(\d{4})$/;
  const matches = dateStr.match(regExp);
  const maxDate = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let isValid = false;

  if (matches) {
    const month = parseInt(matches[1]);
    const date = parseInt(matches[2]);
    const year = parseInt(matches[3]);

    isValid = month <= 12 && month > 0;
    isValid = isValid && date <= maxDate[month] && date > 0;

    const leapYear = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    isValid = isValid && (month !== 2 || leapYear || date <= 28);
  }

  return isValid;
}

export function validateEmail(email: string) {
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_REGEX.test(String(email).toLowerCase());
}

export const customMemoResolver = (...args: any[]) => JSON.stringify(args);
// export const arrToObj = memoize(
//   (array: any[], key: string | number = 'id') =>
//     (array || []).reduce((obj: any, item: any) => {
//       obj[item[key]] = item;
//       return obj;
//     }, {}),
//   customMemoResolver,
// );

// export const objToArr = memoize((obj: any, sortOptions: { sortField?: string | number; sortBy?: 'DESC' | 'ASC' }) => {
//   let arr = Object.values(obj || {});
//   if (sortOptions) {
//     const sortField = sortOptions.sortField || 'id';
//     if (sortOptions.sortBy === 'DESC') {
//       arr = orderBy(arr, sortField, 'desc');
//     } else {
//       arr = orderBy(arr, sortField, 'asc');
//     }
//   }
//   return arr;
// }, customMemoResolver);

export async function asyncForEach<T>(arr: T[], callback: (a: T, i: number, arr: T[]) => Promise<any>) {
  for (let i = 0, l = arr.length; i < l; i++) {
    await callback(arr[i], i, arr);
  }
}
export function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
export function scrollToRef(ref: React.RefObject<any>, offset = 0) {
  if (ref && ref.current) {
    window.scrollTo(0, ref.current.offsetTop - offset); // General scroll to element function
  }
}
export function scrollToTop() {
  window.scrollTo(0, 0);
}
export function ellipsisUtil(str: string, len: number): string {
  let q = str || '';
  q = q.length > len ? q.substr(0, len).trim() + '...' : q;
  return q;
}

/**
 * Check if a given value exists
 *
 * @export
 * @param {*} val
 * @returns {boolean}
 */
export function exists(val: any): boolean {
  return val !== undefined;
}

/**
 * Check if a given value is an array
 *
 * @export
 * @param {*} val
 * @returns {val is any[]}
 */
export function isArray(val: any): val is any[] {
  return Array.isArray(val);
}

/**
 * Check if a given value is an object
 *
 * @export
 * @param {*} val
 * @returns {val is object}
 */
export function isObject(val: any): val is object {
  return typeof val === 'object' && !isArray(val) && val !== null;
}

/**
 * Check if a given value is a string
 *
 * @export
 * @param {*} val
 * @returns {val is string}
 */
export function isString(val: any): val is string {
  return typeof val === 'string';
}

/**
 * Remove any null values from an object
 *
 * @export
 * @param {({ [key in string | number]: any })} obj
 * @returns {object}
 */
export function removeNull(obj: { [key in string | number]: any }): object {
  Object.keys(obj).forEach((key) => obj[key] === null && delete obj[key]);
  return obj;
}

/**
 * Calculate age in years based on a date of birth
 *
 * @export
 * @param {(number | string | Date)} birthday
 * @returns {number}
 */
export function calculateAge(birthday: number | string | Date): number {
  const ageDifMs = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * Get a random number between between min and max inclusive
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Format arrays into options to be used with react-select
 *
 * @export
 * @param {any[]} arr
 * @param {{ valueKey?: string | number; labelKey?: string; getValue?: Function; getLabel?: Function }} options
 * @returns {ReactSelectOption[]}
 */
export function formatSelectOptions(
  arr: any[],
  options: {
    valueKey?: string | number;
    labelKey?: string;
    getValue?: Function;
    getLabel?: Function;
  },
): { label: string; value: string | number }[] {
  return arr.map((a) => {
    let value;
    if (options.valueKey) {
      value = a[options.valueKey];
    } else if (options.getValue) {
      value = options.getValue(a);
    }
    let label;
    if (options.labelKey) {
      label = a[options.labelKey];
    } else if (options.getLabel) {
      label = options.getLabel(a);
    }
    return { value, label };
  });
}
