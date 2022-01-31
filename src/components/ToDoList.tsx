import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoriesState,
  categoryIndexState,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateCustomCategory from "./CreateCustomCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const [loading, setLoading] = useState(true);
  const toDos = useRecoilValue(toDoSelector);
  const setTodo = useSetRecoilState(toDoState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [categoryIndex, setCategoryIndex] = useRecoilState(categoryIndexState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const targetIndex = categories.findIndex(
      (item) => item === event.currentTarget.value
    );
    setCategoryIndex(+targetIndex);
  };

  const loadDataFromLocalStorage = () => {
    const localCategories = localStorage.getItem("CATEGORIES");
    const todo = localStorage.getItem("TODOS");
    if (localCategories) {
      setCategories([...JSON.parse(localCategories)]);
    } else {
      localStorage.setItem("CATEGORIES", JSON.stringify([...categories]));
    }
    if (todo) {
      setTodo([...JSON.parse(todo)]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  if (loading) {
    return <div>Loading from localStorage...</div>;
  }
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={categories[categoryIndex]} onInput={onInput}>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <CreateCustomCategory />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
