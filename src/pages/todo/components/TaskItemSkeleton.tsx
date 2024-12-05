const TaskItemSkeleton = () => {
  return (
    <div className="w-full skeleton p-5 rounded border border-secondary/20 justify-between flex">
      <div className="w-[25%] skeleton bg-neutral/50 rounded-md">&nbsp;</div>
      <div className="w-[25%] skeleton bg-neutral/50 rounded-md">&nbsp;</div>
    </div>
  );
};

export default TaskItemSkeleton;
