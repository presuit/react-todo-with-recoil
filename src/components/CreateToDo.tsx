import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryIndexState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [todos, setToDos] = useRecoilState(toDoState);
  const categoryIndex = useRecoilValue(categoryIndexState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    const newTodo = { text: toDo, id: Date.now(), categoryIndex };

    localStorage.setItem("TODOS", JSON.stringify([newTodo, ...todos]));

    setToDos((oldToDos) => [newTodo, ...oldToDos]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
