### 知识点

1. keyof

- `keyof`  的作用将一个  **类型**  映射为它  **所有成员名称的联合类型**

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type todoKey = keyof Todo; // "title" | "description" | "completed"
```

- 实际使用  
  比如我们经常获取一个对象的某个属性，会获取到 `undefined`

```js
function getProperty(obj, key) {
  return obj[key];
}

const obj = {
  foo: 1,
  bar: 2,
  baz: 3,
};

const foo = getProperty(obj, "foo");
const b = getProperty(obj, "b");
console.log(b); // undefined
```

这时，我们直接添加泛型，会报错。因为现在无法确定 `K` 是否是 `T` 的成员属性。

```ts
function getProperty<T, K>(obj: T, key: K) {
  return obj[key]; // Error 类型“K”无法用于索引类型“T”。
}
```

用 `keyof` 来获取 `T` 的所有成员属性，用 `extends` 来判断 `K` 是否可以赋值它。

用上面的例子来分解：

```ts
// 这里泛型的意思就是，K 是 T 成员属性中的一个。如果 K 传的值不是 T 成员属性其中之一，就会报错。
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const obj = {
  foo: 1,
  bar: 2,
  baz: 3,
};

// keyof T => "foo" | "bar" | "baz"

const foo = getProperty(obj, "foo"); // "foo" extends "foo" | "bar" | "baz"，正常

const b = getProperty(obj, "b"); // "b" extends "foo" | "bar" | "baz"，报错
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/510940bdd9314b46b5127f9d7f8c4cfb~tplv-k3u1fbpfcp-watermark.image?) 2. extends

- `extends` 有很多功能，这里只讲上面用到的功能。**判断是否能将左边的类型赋值给右边的类型**
- 实际使用

```ts
// 左边能赋值给右边
type trueType = "foo" extends "foo" | "bar" | "baz" ? "trueType" : "falseType";
// 左边不能赋值给右边
type falseType = "b" extends "foo" | "bar" | "baz" ? "trueType" : "falseType";
```

3. in

- `in`  操作符用于遍历目标类型的公开属性名。类似  `for .. in`  的机制。

- 实际使用

```ts
// 遍历枚举类型
enum Letter {
  A,
  B,
  C,
}
type LetterMap = { [key in Letter]: string };

// 遍历联合类型
type Property = "name" | "age" | "phoneNum";
type PropertyObject = { [key in Property]: string };
```

### 解答

3 条测试用例

1. `MyPick<Todo, 'title' | 'completed' | 'invalid'>` **K extends keyof T，限制了 K 只能是 T 的成员属性，否则报错**
2. `Expect<Equal<Expected1, MyPick<Todo, 'title'>>>`
3. `Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>`
   **2 和 3 都是 U 是否是 K 的一个属性，如果是就添加。就达到了 Pick 的效果了。**

```ts
type MyPick<T, K extends keyof T> = {
  [U in K]: T[U];
};
```
