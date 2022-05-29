## 元组转换为对象

11 - 元组转换为对象

---

by sinoon (@sinoon) #简单

### 题目

传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

例如：

```ts
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

### 知识点

1. `const`
   字面量，可以理解为不可修改。

```ts
let a1 = "123";
type a1 = typeof a1; // string
a1 = "321";

const a2 = "123";
type a2 = typeof a2; // '123'
a2 = "321"; // 无法分配到 "a2" ，因为它是常数。
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/887cf7fa548d43919755ad0a10206882~tplv-k3u1fbpfcp-watermark.image?)

数组同样，不加 `const` 就是可以修改，加 `const` 不可以修改，在 `TS` 里叫作 `元组`

```ts
let arr1 = ["tesla", "model 3", "model X", "model Y"];
arr1[0] = "test";

const arr2 = ["tesla", "model 3", "model X", "model Y"] as const;
arr2[0] = "test"; // 无法分配到 "0" ，因为它是只读属性。

// as 是断言，意思是告诉 TS 服务，它就是 const
```

2. `typeof`
   在 `TS` 里可以理解为有两部分，一部分是原来的 `JS`，一部分是`类型`。如果要获取一个`JavaScript`变量的类型就可以用 `typeof`。

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
const obj = {
  name: "AAA",
  age: 23,
};

// 结果：(a: number, b:number) => number
type t1 = typeof add;
// 结果：{ name: string; age: number; }
type t2 = typeof obj;
```

> 有些简单的判断，系统可以自动推断类型，所以不用 typeof 也可以有类型约束。但复杂的泛型不行。

3. `T[number]`
   表示返回所有数字型索引的元素，形成一个联合类型，例如：

```ts
const arr2 = ["tesla", "model 3", "model X", "model Y"] as const;
type Tuple = typeof arr2;
type arr = Tuple[number]; // "tesla" | "model 3" | "model X" | "model Y"
```

### 解答

还和上面一样，只不过需要先用`T[number]`获取到元组的所有元素，  
然后遍历，  
因为是获取到的元素，返回值直接返回 P 就行。

```ts
type TupleToObject<T extends readonly string[]> = {
  [P in T[number]]: P;
};
```

> 注意泛型里的 T extends readonly string[]，如果使用 any 会导致 @ts-expect-error 这条报错
