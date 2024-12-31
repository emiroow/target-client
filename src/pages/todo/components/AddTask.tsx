import { useFormik } from "formik";
import { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdSaveAs } from "react-icons/md";
import FormikTextInput from "../../../components/common/FormikTextInput";
import useTask from "../useTask";
interface Props {
  formik: ReturnType<typeof useFormik<any>>;
  taskEditState: { isEdit: boolean; id: string };
}
const AddTask: FC<Props> = ({ formik, taskEditState }) => {
  const { createTaskMutation } = useTask();

  return (
    <form
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      className="w-[95%] md:w-[60%] lg:w-[50%] 2xl:w-[30%] m-auto flex flex-row justify-between gap-1"
    >
      <FormikTextInput
        name="title"
        placeholder="هدف"
        className="w-full"
        formik={formik}
        innerSymbol="عنوان"
      />
      <div className=" flex gap-1">
        <div
          className="tooltip"
          data-tip={taskEditState.isEdit ? "ویرایش هدف" : "ایجاد هدف"}
        >
          <button
            type="submit"
            className={`btn btn-square btn-active  ${
              taskEditState.isEdit ? "btn-success" : "btn-secondary"
            }`}
          >
            {createTaskMutation.isPending ? (
              <span className="loading loading-spinner loading-md text-white"></span>
            ) : taskEditState.isEdit ? (
              <MdSaveAs className="text-2xl text-white p-0" />
            ) : (
              <BiPlus className="text-2xl text-white p-0" />
            )}
          </button>
        </div>

        {taskEditState.isEdit && (
          <div className="tooltip" data-tip="انصراف">
            <button
              type="reset"
              className={`btn btn-square btn-active btn-error`}
            >
              <IoClose className="text-2xl text-white p-0" />
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
export default AddTask;
