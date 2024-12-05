import { Fragment } from "react/jsx-runtime";
import AddTodo from "./components/AddTask";
import TodoInfoBox from "./components/taskInfoBox";
import TaskItemSkeleton from "./components/TaskItemSkeleton";
import ContentBox from "./components/template/ContentBox";
import TodoItem from "./components/template/TaskItem";
import useTask from "./useTask";

const Task = () => {
  const { getTasksQueryIsLoading, getTasksQuery } = useTask();

  return (
    <div className="rounded-lg flex flex-col gap-3">
      {/* container */}
      <div className="w-full justify-center d-flex mt-5 sm:mt-10">
        {/* Box,s */}
        <div className="flex gap-3 flex-col">
          {/* box info */}
          <TodoInfoBox />
          {/* Add Box */}
          <AddTodo />
          {/* content box */}
          <ContentBox>
            <Fragment>
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
                  return <TodoItem data={item} key={index} />;
                })
              ) : (
                <div className="w-full border border-secondary text-center flex items-center justify-center rounded p-5 h-[53vh] bg-main/50">
                  (خالی)
                </div>
              )}
            </Fragment>
          </ContentBox>
        </div>
      </div>
    </div>
  );
};

export default Task;
