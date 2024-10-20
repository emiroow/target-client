const BoardHeadSkeleton = () => {
  return (
    <div className="w-full py-5 flex gap-3 items-center">
      <span className="w-12 h-12 text-center skeleton items-center text-2xl self-center justify-center flex rounded-full bg-secondary/10 drop-shadow-xl shadow-xl glass "></span>
      <span className="text-2xl skeleton text-secondary font-sansBold w-[8%]">
        &nbsp;
      </span>
    </div>
  );
};

export default BoardHeadSkeleton;
