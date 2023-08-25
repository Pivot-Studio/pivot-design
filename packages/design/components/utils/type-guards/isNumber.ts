/**
 * 判断是否是数字类型，排除NaN、Infinity
 * @param number
 * @returns `boolean` number is Number
 */
export const isNumber = (number: unknown): number is Number => {
  const isNumber = typeof number === 'number';
  return isNumber && number === number && Number.isFinite(number);
};
