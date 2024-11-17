import { IBoardResponse } from "@/interfaces/response/IBoard";
import { convertPersianDate } from "@/utils/common/date";
import { FC } from "react";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Board: FC<{
  data: NonNullable<IBoardResponse["boardList"]>[number];
  editBoard?: () => void;
  deleteBoard?: () => void;
}> = ({ data, editBoard, deleteBoard }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`h-max max-sm:w-[100%] 
      relative rounded-xl p-3 bg-center bg-no-repeat overflow-hidden drop-shadow-lg shadow-black/50 shadow-lg hover:cursor-pointer group`}
    >
      <div className="dropdown absolute z-50 top-2 left-2">
        <button tabIndex={0} className="btn btn-square btn-sm btn-ghost ">
          <BsThreeDotsVertical className="text-lg" />
        </button>
        <ul className="menu dropdown-content bg-base-200 rounded-lg -m-1.5 mt-0.5 gap-3 p-1.5">
          <li>
            <button
              onClick={async () => {
                editBoard?.();
              }}
              className="menu-dropdown-toggle tooltip tooltip-right p-0"
              data-tip="ویرایش"
            >
              <BsFillPencilFill className="p-[8px] text-3xl text-green-500" />
            </button>
          </li>
          <li>
            <button
              onClick={async (e) => {
                deleteBoard?.();
              }}
              className="tooltip tooltip-right p-0"
              data-tip="حذف"
            >
              <BsFillTrashFill className="p-[8px] text-3xl text-red-500" />
            </button>
          </li>
        </ul>
      </div>

      <div
        onClick={() => navigate(`/board/${data._id}`)}
        className="relative z-10 flex flex-col gap-3 "
      >
        <div className="w-full flex flex-row items-center gap-3 mt-2">
          <div className="w-max drop-shadow-2xl p-3 glass rounded-xl flex justify-center items-center self-center">
            <span className="text-xl">{data.emoji}</span>
          </div>
          <span className="font-sansRegular text-white text-lg">
            {data.name}
          </span>
        </div>
        <div className="w-full">
          <span className="flex justify-between">
            <span>تعداد اهداف</span>
            <span>{data.totalTargets}</span>
          </span>
        </div>
        <div className="w-full text-left">
          <span className="font-sansLight text-sm">
            {convertPersianDate(data?.date || "")}
          </span>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50 transition-transform duration-300 transform group-hover:scale-125"
        style={{
          backgroundImage: `url(${data.backgroundImageUrl})`,
        }}
      ></div>
    </div>
  );
};

export default Board;
