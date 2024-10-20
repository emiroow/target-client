import { BiSolidEditAlt } from "react-icons/bi";
import BoardHeadSkeleton from "./components/BoardHeadSkeleton";
import BoardTargetSkeleton from "./components/BoardTargetSkeleton";
import TargetCard from "./components/TargetCard";
import useBoard from "./useBoard";

const Board = () => {
  const { targets, boardInfo, boardInfoLoading, targetsIsLoading } = useBoard();

  return (
    <>
      {boardInfoLoading ? (
        <BoardHeadSkeleton />
      ) : (
        <div className="w-full">
          {/* Board Name */}
          <div className="w-full py-5 flex gap-3 items-center">
            <span className="w-12 h-12 text-center items-center text-2xl self-center justify-center flex rounded-full bg-secondary/10 drop-shadow-xl shadow-xl glass ">
              {boardInfo?.data?.emoji}
            </span>
            <span className="text-2xl text-secondary font-sansBold">
              {boardInfo?.data?.name}
            </span>
            <button className="btn btn-ghost btn-sm btn-circle p-1">
              <BiSolidEditAlt className="text-2xl text-success" />
            </button>
          </div>

          {/* search and Filter Inputs */}
          <div className="w-full"></div>
          {/* Targets */}
          <div className="w-full px-2 flex gap-3 mt-1 pb-5 h-max overflow-x-auto scroll-smooth">
            {!targetsIsLoading ? (
              <>
                <BoardTargetSkeleton />
                <BoardTargetSkeleton />
                <BoardTargetSkeleton />
              </>
            ) : (
              targets?.data?.map((item, index: number) => {
                return <TargetCard data={item} key={index} />;
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
