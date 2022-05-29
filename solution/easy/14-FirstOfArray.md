### 知识点

1. `infer`
   在 `extends` 语句中，支持`infer`关键字，表示语句中待推断的类型变量。这个有点难以理解，还是看例子吧。

```ts
// 如果泛型变量 T 是 `() => infer R` 的子集，那么返回通过 infer 获取到的函数返回值，否则返回 boolean 类型。
type Func<T> = T extends () => infer R ? R : boolean;

let func1: Func<number>; // => boolean
let func2: Func<"">; // => boolean
let func3: Func<() => Promise<number>>; // => Promise<number>
```

```ts
// T 如果可以赋值给 [infer H, ...any[]]，就返回数组的第一个类型。
type arrHead<T> = T extends [infer H, ...any[]] ? H : never;

type arr = ["one", "two", "three"];

type head = arrHead<arr>; // "one"
```

### 解答

1. 利用 `infer` 获取第一个元素

```ts
type First<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First
  : never;
```

2. 利用 `0` 下标直接获取，判断一下是不是空数组。

```ts
type First<T extends any[]> = T extends [] ? never : T[0];
```

3. 利用 `T['length']` 返回数组长度判断是否是空数组，然后用 `0` 下标获取第一个元素。

```ts
type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
```

4. 利用之前的知识点 `T[number]` 返回所有元素的联合类型。

```ts
// T[number] T 为空时会返回 never
type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;
```

> 这里需要注意下，First<[3, 2, 1]>，泛型里的所有参数都是类型而不是 JavaScript 对象。所以如果要从 JS 里引用的话，需要用 typeof。
