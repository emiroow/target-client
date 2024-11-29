import { BiPlus } from "react-icons/bi";
import FormikTextInput from "../../../components/common/FormikTextInput";
import useTodo from "../useTodo";
const AddTodo = () => {
  const { todoFormik } = useTodo();

  return (
    <form
      onSubmit={todoFormik.handleSubmit}
      onReset={todoFormik.handleReset}
      className="w-[95%] md:w-[60%] lg:w-[50%] 2xl:w-[30%] m-auto flex flex-row justify-between gap-1"
    >
      <FormikTextInput
        name="label"
        placeholder="هدف"
        className="w-full"
        formik={todoFormik}
        innerSymbol="عنوان"
      />
      <div className="tooltip" data-tip="ایجاد هدف">
        <button
          type="submit"
          className="btn btn-square max-sm:btn-sm btn-active btn-secondary"
        >
          <BiPlus className="text-2xl text-white p-0" />
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
