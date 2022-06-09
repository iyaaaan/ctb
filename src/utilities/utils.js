import moment from "moment";

/**
 * Unpack object value, removes curly brace
 * @param {*} obj
 * @returns
 */
export function unpackObject(obj) {
  return Object.values(obj).reduce((acc, value) => ({ ...acc, ...value }), {});
}

/**
 * Convert date object to date
 * @param {*} dateObj
 * @returns
 */
export function toDate(dateObj) {
  return moment(dateObj).format("YYYY-MM-DD");
}
