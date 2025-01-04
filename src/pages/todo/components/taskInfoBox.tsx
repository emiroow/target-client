import { TARGET_STATUS } from "@/constant/enums";
import { targetStatusDecider } from "@/utils/common/deciders";
import { AnimatePresence, motion } from "framer-motion";
import { BsUiChecks } from "react-icons/bs";
import { FaCheck, FaTasks } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import useTask from "../useTask";

const TaskInfoBox = () => {
  const { getTargetInfo, getTargetInfoIsPending } = useTask();

  return (
    <div className=" w-[95%] md:w-[60%] lg:w-[50%] 2xl:w-[30%] m-auto border rounded sm:p-5 sm:py-8 p-3 ">
      <AnimatePresence mode="wait">
        {getTargetInfoIsPending ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.1,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="w-full justify-between items-center flex p-16"
          >
            <span className="loading loading-spinner loading-lg text-white m-auto"></span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.1,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex flex-row-reverse justify-between items-center"
          >
            {/* text */}
            <div className="flex w-[55%] flex-col">
              <span className="font-bold sm:text-3xl text-xl text-white">
                اهداف انجام شده
              </span>
              <span className="sm:text-xl text-[19px] font-bold text-secondary mt-2">
                {getTargetInfo?.data?.title}
              </span>
              <span className="sm:text-md text-[15px] text-secondary mt-2">
                {getTargetInfo?.data?.subTitle}
              </span>
              <span className="sm:text-sm text-[12px] mt-2 ">
                {getTargetInfo?.data?.description}
              </span>
              <div className="w-full flex justify-end">
                <div
                  className={`badge ${
                    getTargetInfo?.data?.status === TARGET_STATUS.FINISHED
                      ? "badge-success "
                      : "badge-warning"
                  } p-3 text-[12px] text-white gap-1 shadow-md drop-shadow-md mt-4`}
                >
                  {getTargetInfo?.data?.status === TARGET_STATUS.FINISHED ? (
                    <FaCheck />
                  ) : (
                    <IoTimeOutline />
                  )}
                  {targetStatusDecider(getTargetInfo?.data?.status)}
                </div>
              </div>
            </div>
            {/* data circle */}
            <div className=" w-[40%] flex justify-center items-center">
              <div className="w-[15vh] h-[15vh]  flex flex-col border-2 border-neutral justify-center self-center items-center text-center text-white relative rounded-full drop-shadow-2xl shadow-2xl shadow-black">
                <div className=" overflow-hidden z-50 relative w-full bg-secondary h-[15vh] rounded-t-full text-center flex items-center justify-start border-b-2">
                  <span className="text-white font-bold z-50 ms-8 mt-4">
                    {getTargetInfo?.data?.totalTodo || 0}
                  </span>
                  <BsUiChecks className="font-bold text-6xl absolute top-3 left-5 transform rotate-12 opacity-40" />
                </div>
                <div className="w-full bg-neutral overflow-hidden relative h-[15vh] rounded-b-full flex items-center justify-end">
                  <span className="text-white font-bold z-50 me-8 mb-4">
                    {getTargetInfo?.data?.totalDoneTodo}
                  </span>
                  <FaTasks className="text-6xl absolute top-2 right-6 transform rotate-12 opacity-40" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskInfoBox;
