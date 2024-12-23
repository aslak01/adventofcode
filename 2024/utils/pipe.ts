type UnaryFunction<T, R> = (arg: T) => R;

export function pipe<T>(
  ...fns: UnaryFunction<any, any>[]
): UnaryFunction<T, any> {
  return (value: T) => fns.reduce((acc, fn) => fn(acc), value);
}
