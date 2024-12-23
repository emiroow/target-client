import { AnimatePresence, motion } from "framer-motion";
import AddTask from "./components/AddTask";
import TodoInfoBox from "./components/taskInfoBox";
import TaskItemSkeleton from "./components/TaskItemSkeleton";
import ContentBox from "./components/template/ContentBox";
import TodoItem from "./components/template/TaskItem";
import useTask from "./useTask";

const Task = () => {
  const { getTasksQueryIsLoading, getTasksQuery, taskFormik, setEditTask } =
    useTask();
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
      <div className="rounded-lg flex flex-col gap-3">
        {/* container */}
        <div className="w-full justify-center d-flex mt-5 sm:mt-5">
          {/* Box,s */}
          <div className="flex gap-3 flex-col">
            {/* box info */}
            <TodoInfoBox />
            {/* Add Box */}
            <AddTask formik={taskFormik} />
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
      </div>
    </motion.div>
  );
};

export default Task;
