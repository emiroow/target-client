const BoardTargetSkeleton = () => {
  return (
    <div className="flex-shrink-0 2xl:w-[20%] h-max xl:w-[30%] lg:w-[30%] md:w-[35%] sm:w-[40%] w-[95%] ">
      <div className="skeleton cursor-pointer rounded-lg bg-neutral p-3 transition-all delay-100 duration-700 hover:shadow-primary/50">
        <div className="w-full flex justify-between items-center">
          {/* icon */}
          <div className="w-max drop-shadow-2xl p-3 glass rounded-xl flex justify-center items-center self-center">
            <span className="text-xl">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
          {/* subTitle */}
          <div className="w-full p-2">
            <p className="font-sansRegular text-[13px] w-32 skeleton shadow-md drop-shadow-md">
              &nbsp;
            </p>
          </div>
          {/* difficulty */}
          <div className="badge badge-ghost p-2 text-white text-[12px] w-20 skeleton shadow-md drop-shadow-md"></div>
        </div>

        <p className="text-sm mt-4 skeleton h-[2vh]"></p>
        <p className="text-sm mt-1 skeleton h-[2vh]"></p>
        <p className="text-sm mt-1 skeleton h-[2vh]"></p>
        <p className="text-sm mt-1 skeleton h-[2vh]"></p>
        <p className="text-sm mt-1 w-32 skeleton h-[2vh]"></p>

        {/* recently */}
        <div className="w-full mt-4">
          <p className="font-sansBold text-sm skeleton w-44">&nbsp;</p>
          <div className="flex flex-col gap-2 mt-2">
            <section className="w-full skeleton flex justify-between bg-base-300 p-3 rounded-lg glass shadow-md drop-shadow-md">
              &nbsp;
            </section>
            <section className="w-full skeleton flex justify-between bg-base-300 p-3 rounded-lg glass shadow-md drop-shadow-md">
              &nbsp;
            </section>
            <section className="w-full skeleton flex justify-between bg-base-300 p-3 rounded-lg glass shadow-md drop-shadow-md">
              &nbsp;
            </section>
          </div>
        </div>

        {/* target info */}
        <div className="w-full mt-4">
          <div className="flex flex-col gap-2 mt-2">
            <section className="flex items-center gap-2 skeleton w-full shadow-md drop-shadow-md">
              &nbsp;
            </section>
            <section className="flex items-center gap-2 skeleton w-full shadow-md drop-shadow-md">
              &nbsp;
            </section>
            <section className="flex items-center gap-2 skeleton w-full shadow-md drop-shadow-md">
              &nbsp;
            </section>
          </div>
        </div>

        {/* status */}
        <div className="w-full flex justify-end items-center mt-4">
          <div className="badge w-28 skeleton badge-warning p-3 text-[12px] gap-1 shadow-md drop-shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

export default BoardTargetSkeleton;
