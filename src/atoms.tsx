import { atom, selector } from "recoil";

export const categoriesState = atom({
  key: "categories",
  default: ["TO_DO", "DOING", "DONE"],
});

export interface IToDo {
  text: string;
  id: number;
  categoryIndex: number;
}

export const categoryIndexState = atom<number>({
  key: "categoryIndex",
  default: 0,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const categoryIndex = get(categoryIndexState);
    return toDos.filter((toDo) => toDo.categoryIndex === categoryIndex);
  },
});
