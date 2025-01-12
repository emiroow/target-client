import Modal from "@/components/common/Modal";
import { AnimatePresence, motion } from "framer-motion";
import AddTask from "./components/AddTask";
import TodoInfoBox from "./components/taskInfoBox";
import TaskItemSkeleton from "./components/TaskItemSkeleton";
import ContentBox from "./components/template/ContentBox";
import TodoItem from "./components/template/TaskItem";
import useTask from "./useTask";

const Task = () => {
  const {
    getTasksQueryIsLoading,
    getTasksQuery,
    taskFormik,
    setEditTask,
    editTask,
    setDeleteState,
    deleteTaskState,
    deleteTaskServiceMutation,
  } = useTask();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="w-full justify-center d-flex mt-5 sm:mt-5">
        {/* Box,s */}
        <div className="flex gap-3 flex-col">
          {/* box info */}
          <TodoInfoBox />
          {/* Add Box */}
          <AddTask formik={taskFormik} taskEditState={editTask} />
          {/* content box */}
          <ContentBox>
            <AnimatePresence>
              {getTasksQueryIsLoading ? (
                <>
                  <TaskItemSkeleton />
                  <TaskItemSkeleton />
                  <TaskItemSkeleton />
                  <TaskItemSkeleton />
                  <TaskItemSkeleton />
                  <TaskItemSkeleton />
                </>
              ) : getTasksQuery?.data?.length ? (
                getTasksQuery?.data?.map((item, index) => {
                  return (
                    <TodoItem
                      editBoard={() => {
                        taskFormik.setValues({ title: item.title || "" });
                        setEditTask({ isEdit: true, id: item._id || "" });
                      }}
                      data={item}
                      key={index}
                      deleteBoard={() =>
                        setDeleteState({ id: item._id || "", isOpen: true })
                      }
                    />
                  );
                })
              ) : (
                <div className="w-full border border-secondary text-center flex items-center justify-center rounded p-5 h-[53vh] bg-main/50">
                  (خالی)
                </div>
              )}
            </AnimatePresence>
          </ContentBox>
        </div>
      </div>
      <Modal
        modalState={deleteTaskState.isOpen}
        modalStateSetter={setDeleteState}
        size="w-2/5"
        title="حذف هدف"
        onCloseESC={() => setDeleteState({ id: "", isOpen: false })}
        onCloseBackDrop={() => setDeleteState({ id: "", isOpen: false })}
        onDelete={() => deleteTaskServiceMutation.mutate(deleteTaskState.id)}
      >
        <>
          {deleteTaskServiceMutation.isPending ? (
            <div className="w-full flex justify-center items-center p-24">
              <span className="loading loading-spinner loading-md text-white"></span>
            </div>
          ) : (
            <div className="text-center mt-10 text-xl mb-5">
              <span> آیا از خذف بورد </span>
              <span className="text-secondary font-bold">
                {/* {deleteTaskServiceMutation.data?.data?.title} */}
              </span>
              <span> مطمئن هستید ؟</span>
            </div>
          )}
        </>
      </Modal>
    </motion.div>
  );
};

export default Task;
