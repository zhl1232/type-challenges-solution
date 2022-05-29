1. `extends`
   `extends` 的另一个特性。`分配式`，当 `extends` 左边类型是一个联合类型时，会进行拆分，有点类似数学中的分解因式:

```ts
type Diff<T, U> = T extends U ? never : T; // 找出T的差集
type Filter<T, U> = T extends U ? T : never; // 找出交集

type T30 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">; // => "b" | "d"
// <"a" | "b" | "c" | "d", "a" | "c" | "f">
// 相当于
// <'a', "a" | "c" | "f"> |
// <'b', "a" | "c" | "f"> |
// <'c', "a" | "c" | "f"> |
// <'d', "a" | "c" | "f">

type T31 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">; // => "a" | "c"
// <"a" | "b" | "c" | "d", "a" | "c" | "f"> 同上

let demo1: Diff<number, string>; // => number
```
