import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categoriesState } from "../atoms";

interface IForm {
  customCategory: string;
}

function CreateCustomCategory() {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, reset, handleSubmit } = useForm<IForm>();

  const onsubmit = ({ customCategory }: IForm) => {
    const duplicateValidate = categories.find((item) => {
      const a = item.toLowerCase().replaceAll(" ", "-");
      const b = customCategory.trim().toLowerCase().replaceAll(" ", "-");
      return a === b;
    });

    if (!duplicateValidate) {
      const newCategory = customCategory.replaceAll(" ", "_").toUpperCase();

      localStorage.setItem(
        "CATEGORIES",
        JSON.stringify([...categories, newCategory])
      );

      setCategories((prev) => [...prev, newCategory]);
      reset();
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input
          placeholder="custom category"
          {...register("customCategory", { required: true, minLength: 3 })}
        />
        <button>Add Category</button>
      </form>
    </div>
  );
}

export default CreateCustomCategory;
