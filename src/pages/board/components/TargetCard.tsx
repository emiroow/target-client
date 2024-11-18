import { ITargetResponse } from "@/interfaces/response/ITarget";
import { convertPersianDate } from "@/utils/common/date";
import {
  targetDifficultyDecider,
  targetStatusDecider,
} from "@/utils/common/deciders";
import { FC } from "react";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaListUl, FaTasks } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { PiListMagnifyingGlassBold } from "react-icons/pi";
interface Props {
  data: ITargetResponse;
  editBoard?: () => void;
  deleteBoard?: () => void;
}

const TargetCard: FC<Props> = ({ data, editBoard, deleteBoard }) => {
  return (
    <div className="flex-shrink-0 2xl:w-[20%] h-max xl:w-[30%] lg:w-[30%] md:w-[35%] sm:w-[40%] w-[95%]">
      <div className="flex justify-between ps-4 mb-1 items-center">
        <span className="font-sansBold">{data.title}</span>
        <div className="dropdown z-50">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-sm btn-square text-primary"
          >
            <BsThreeDotsVertical className="text-lg" />
          </button>
          <ul className="menu dropdown-content bg-base-200 rounded-lg -m-[10px] mt-1 gap-3 p-1.5">
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
      <div className="cursor-pointer rounded-lg bg-neutral p-3 shadow-lg drop-shadow-2xl shadow-primary/15 border border-primary/5 transition-all delay-100 duration-700 hover:shadow-primary/50">
        <div className="w-full flex justify-between items-center">
          {/* icon */}
          <div className="w-max drop-shadow-2xl p-3 glass rounded-xl flex justify-center items-center self-center">
            <span className="text-xl">{data.emoji}</span>
          </div>
          {/* subTitle */}
          <div className="w-full p-2">
            <p className="font-sansRegular text-[13px]">{data.subTitle} </p>
          </div>
          {/* difficulty */}
          <div className="badge badge-ghost p-3 text-white text-[12px]">
            {targetDifficultyDecider(data.difficulty)}
          </div>
        </div>

        <p className="text-sm mt-3">{data.description}</p>

        {/* recently */}
        <div className="w-full mt-4">
          <p className="font-sansBold text-sm">اهداف اخیر</p>
          <div className="flex flex-col gap-2 mt-2">
            <section className="w-full flex justify-between bg-base-300 p-3 rounded-lg glass">
              <span className="text-xs">عنوان</span>
              <span className="text-xs">tets</span>
            </section>
            <section className="w-full flex justify-between bg-red-800 p-3 rounded-lg glass">
              <span className="text-xs">عنوان</span>
              <span className="text-xs">tets</span>
            </section>
            <section className="w-full flex justify-between bg-green-800 p-3 rounded-lg glass">
              <span className="text-xs">عنوان</span>
              <span className="text-xs">tets</span>
            </section>
          </div>
        </div>

        {/* target info */}
        <div className="w-full mt-4">
          <div className="flex flex-col gap-2 mt-2">
            <section className="flex items-center gap-2">
              <FaListUl className="text-primary" />
              <span className="text-sm">کل اهداف</span>
              <span>:</span>
              <span className="text-sm">{data.totalTodo}</span>
            </section>
            <section className="flex items-center gap-2">
              <FaTasks className="text-success" />
              <span className="text-sm">اهداف انجام شده</span>
              <span>:</span>
              <span className="text-sm">{data.totalDoneTodo}</span>
            </section>
            <section className="flex items-center gap-2">
              <PiListMagnifyingGlassBold className="text-xl text-warning" />
              <span className="text-sm">اهداف در انتظار انجام</span>
              <span>:</span>
              <span className="text-sm">{data.totalPendingTodo}</span>
            </section>
          </div>
        </div>

        {/* date & status */}
        <div className="w-full flex items-center justify-between mt-4">
          <span className="font-sansLight text-sm">
            {convertPersianDate(data.createdAt || "")}
          </span>
          <div className="badge badge-warning p-3 text-[12px] gap-1 shadow-md drop-shadow-md">
            <IoTimeOutline />
            {targetStatusDecider(data.status)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetCard;
