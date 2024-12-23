type UnaryFunction<T, R> = (arg: T) => R;

export function pipe<T, R>(
  fn1: UnaryFunction<T, any>,
  ...fns: UnaryFunction<any, any>[]
): UnaryFunction<T, R> {
  return (value) => fns.reduce((acc, fn) => fn(acc), fn1(value));
}
