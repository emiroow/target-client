import { BiPlus } from "react-icons/bi";
import FormikTextInput from "../../../components/common/FormikTextInput";
import useTask from "../useTask";
const AddTask = () => {
  const { taskFormik, createTaskMutation } = useTask();

  return (
    <form
      onSubmit={taskFormik.handleSubmit}
      className="w-[95%] md:w-[60%] lg:w-[50%] 2xl:w-[30%] m-auto flex flex-row justify-between gap-1"
    >
      <FormikTextInput
        name="title"
        placeholder="هدف"
        className="w-full"
        formik={taskFormik}
        innerSymbol="عنوان"
      />
      <div className="tooltip" data-tip="ایجاد هدف">
        <button
          type="submit"
          className="btn btn-square btn-active btn-secondary"
        >
          {createTaskMutation.isPending ? (
            <span className="loading loading-spinner loading-md text-white"></span>
          ) : (
            <BiPlus className="text-2xl text-white p-0" />
          )}
        </button>
      </div>
    </form>
  );
};

export default AddTask;
