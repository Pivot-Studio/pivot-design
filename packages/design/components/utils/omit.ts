export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };

  keys.forEach((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (result.hasOwnProperty(key)) {
      delete result[key];
    }
  });

  return result;
}
