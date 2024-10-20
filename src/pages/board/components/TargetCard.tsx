import { ITargetResponse } from "@/interfaces/response/ITarget";
import { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaListUl, FaTasks } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { PiListMagnifyingGlassBold } from "react-icons/pi";
interface Props {
  data: ITargetResponse;
}

const TargetCard: FC<Props> = () => {
  return (
    <div className="flex-shrink-0 2xl:w-[20%] h-max xl:w-[30%] lg:w-[30%] md:w-[35%] sm:w-[40%] w-[95%]">
      <div className="flex justify-between ps-4 mb-1 items-center">
        <span className="font-sansBold">عنوان</span>
        <button className="btn btn-ghost btn-sm btn-square text-primary">
          <BsThreeDotsVertical className="text-lg" />
        </button>
      </div>
      <div className="cursor-pointer rounded-lg bg-neutral p-3 shadow-lg drop-shadow-2xl shadow-primary/15 border border-primary/5 transition-all delay-100 duration-700 hover:shadow-primary/50">
        <div className="w-full flex justify-between items-center">
          {/* icon */}
          <div className="w-max drop-shadow-2xl p-3 glass rounded-xl flex justify-center items-center self-center">
            <span className="text-xl">❤️</span>
          </div>
          {/* subTitle */}
          <div className="w-full p-2">
            <p className="font-sansRegular text-[13px]">
              متن لورم ایپسوم فارسی
            </p>
          </div>
          {/* difficulty */}
          <div className="badge badge-ghost p-3 text-white text-[12px]">
            سختی
          </div>
        </div>

        <p className="text-sm mt-3">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد
        </p>

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
              <span className="text-sm">1</span>
            </section>
            <section className="flex items-center gap-2">
              <FaTasks className="text-success" />
              <span className="text-sm">اهداف انجام شده</span>
              <span>:</span>
              <span className="text-sm">1</span>
            </section>
            <section className="flex items-center gap-2">
              <PiListMagnifyingGlassBold className="text-xl text-warning" />
              <span className="text-sm">اهداف در انتظار انجام</span>
              <span>:</span>
              <span className="text-sm">1</span>
            </section>
          </div>
        </div>

        {/* status */}
        <div className="w-full flex justify-end items-center mt-4">
          <div className="badge badge-warning p-3 text-[12px] gap-1 shadow-md drop-shadow-md">
            <IoTimeOutline />
            درحال انجام
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetCard;
