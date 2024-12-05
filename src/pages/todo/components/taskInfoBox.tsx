const TaskInfoBox = () => {
  return (
    <div className=" w-[95%] md:w-[60%] lg:w-[50%] 2xl:w-[30%] m-auto flex flex-row-reverse border rounded sm:p-8 p-5 py-8 justify-between items-center">
      {/* text */}
      <div className="flex flex-col gap-1">
        <span className="font-bold sm:text-3xl text-2xl text-white">
          اهداف انجام شده
        </span>
        <span className="sm:text-xl text-xl text-secondary mt-2">چک کن ;)</span>
      </div>
      {/* data circle */}
      <div className=" bg-secondary flex justify-center self-center items-center text-center sm:w-47 sm:h-47 w-28 h-28 text-white relative rounded-full drop-shadow-2xl shadow-2xl shadow-black">
        <span className="text-4xl">
          <span className="font-medium">1</span>
          <span className="text-4xl"> - </span>
          <span className="font-medium">3</span>
        </span>
      </div>
    </div>
  );
};

export default TaskInfoBox;
