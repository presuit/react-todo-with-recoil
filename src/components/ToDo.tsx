import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";

function ToDo({ text, categoryIndex, id }: IToDo) {
  const categories = useRecoilValue(categoriesState);
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, categoryIndex: +name };
      const diff = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("TODOS", JSON.stringify(diff));
      return diff;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories.map((item, index) => {
        if (categories[categoryIndex] !== item) {
          return (
            <button key={item} name={`${index}`} onClick={onClick}>
              {item}
            </button>
          );
        }
      })}
    </li>
  );
}

export default ToDo;
