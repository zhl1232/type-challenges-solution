

function MyParameters(arr: []) {
  return arr.map(item => item)
}


type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any
  ? P
  : never;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const foo = (arg1: string, arg2: number): void => {};
const bar = (arg1: boolean, arg2: { a: "A" }): void => {};
const baz = (): void => {};


type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: "A" }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>
];