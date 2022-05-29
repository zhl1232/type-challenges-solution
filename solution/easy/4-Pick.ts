type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

type TodoKeys = keyof Todo;
function MyPick(Todo: Todo, keys: TodoKeys[]) {
  const obj = {};
  keys.forEach((key) => {
    obj[key] = Todo[key];
  });
  return obj;
}

const obj = {
  title: "test",
  description: "test",
  completed: true,
};
console.log(MyPick(obj, ["title"]));

enum Letter {
  A,
  B,
  C,
}
type LetterMap = { [key in Letter]: string };

type Property = "name" | "age" | "phoneNum";
type PropertyObject = { [key in Property]: string };
