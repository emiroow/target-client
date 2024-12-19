import { ITaskResponse } from "@/interfaces/response/ITask";
import { convertPersianDate } from "@/utils/common/date";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import {
  BsEye,
  BsFillPencilFill,
  BsFillTrashFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import useTask from "../../useTask";

interface Props {
  data?: ITaskResponse;
  editBoard?: () => void;
  deleteBoard?: () => void;
}

const TaskItem: FC<Props> = ({ deleteBoard, editBoard, data }) => {
  const { changeTaskStatusMutation } = useTask();

  return (
    <motion.div
      key={data?._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full border p-5 rounded flex flex-row item-center justify-between"
    >
      <AnimatePresence mode="wait">
        {changeTaskStatusMutation.isPending ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.1,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="w-full justify-between items-center flex p-1"
          >
            <span className="loading loading-spinner loading-md text-white m-auto"></span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.1,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex w-full justify-between"
          >
            <div className="flex flex-row self-center item-center gap-3">
              {/* todo check */}
              <input
                type="checkbox"
                className="checkbox checkbox-sm mt-1 checkbox-secondary"
                id={data?._id}
                checked={data?.checked}
                onChange={(e) =>
                  changeTaskStatusMutation.mutate({
                    checked: e.target.checked,
                    taskId: data?._id,
                  })
                }
              />
              {/* todo title */}
              <label htmlFor={data?._id} className=" font-light cursor-pointer">
                {data?.title}
              </label>
            </div>
            <div className={`flex flex-row item-center gap-3 items-center`}>
              {/* time */}
              <span className="font-medium">
                {convertPersianDate(data?.createdAt || "")}
              </span>
              {/* action btn s */}
              <div className="dropdown">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-sm btn-square text-secondary z-0"
                >
                  <BsThreeDotsVertical className="text-lg" />
                </button>
                <ul className="menu dropdown-content bg-base-200 rounded-lg -m-[8px] mt-1 gap-3 z-50">
                  <li>
                    <button
                      className="tooltip tooltip-right p-0"
                      data-tip="جزئیات"
                    >
                      <BsEye className="p-[8px] text-3xl text-info" />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => editBoard?.()}
                      className="menu-dropdown-toggle tooltip tooltip-right p-0"
                      data-tip="ویرایش"
                    >
                      <BsFillPencilFill className="p-[8px] text-3xl text-green-500" />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => deleteBoard?.()}
                      className="tooltip tooltip-right p-0"
                      data-tip="حذف"
                    >
                      <BsFillTrashFill className="p-[8px] text-3xl text-red-500" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskItem;
