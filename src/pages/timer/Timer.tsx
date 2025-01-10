import FormikTimePickerInput from "@/components/common/FormikTimePickerInput";
import { useFormik } from "formik";
import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { VscDebugRestart, VscDebugReverseContinue } from "react-icons/vsc";
import { useTimer } from "react-timer-hook";

const Timer = () => {
  const [time, setTime] = useState<any>(new Date());
  const [previousTime, setPreviousTime] = useState<any>(new Date());

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    pause,
    restart,
    resume,
    start,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {},
  });

  const formik = useFormik<{ time: any }>({
    initialValues: { time: "" },
    onSubmit: ({ time }) => {
      const { second, hour, minute } = time.toObject();
      const date = new Date();
      console.log(date);
      date.setHours(hour);
      date.setMinutes(minute);
      date.setSeconds(second);
      console.log(date);
      restart(date);
    },
  });

  return (
    <div className="flex justify-center flex-col items-center shrink-0">
      <div className="w-full text-center justify-center items-center flex flex-row-reverse md:text-8xl text-5xl md:gap-5 gap-1 mt-[250px] max-md:font-bold">
        <span className="shadow-md shadow-black/30 flex items-center justify-center  w-[100px] h-[100px] md:w-[170px]  md:h-[200px] rounded-lg text-center glass ">
          {days}
        </span>
        :
        <span className="shadow-md shadow-black/30 flex items-center justify-center w-[100px] h-[100px] md:w-[170px] md:h-[200px] rounded-lg text-center glass">
          {hours}
        </span>
        :
        <span className="shadow-md shadow-black/30 flex items-center justify-center w-[100px] h-[100px] md:w-[170px] md:h-[200px] rounded-lg text-center glass">
          {minutes}
        </span>
        :
        <span className="shadow-md shadow-black/30 flex items-center justify-center w-[100px] h-[100px] md:w-[170px] md:h-[200px] rounded-lg text-center glass">
          {seconds}
        </span>
      </div>
      <div className="w-full justify-center mt-16 flex gap-3">
        {!isRunning && (
          <button
            onClick={resume}
            className="group btn btn-warning btn-md glass text-neutral-content"
          >
            ادامه
            <VscDebugReverseContinue className="text-xl text-warning group-hover:text-neutral-content" />
          </button>
        )}
        {!isRunning && (
          <button
            onClick={() => {
              formik.submitForm();
            }}
            className="group btn btn-success btn-md glass text-neutral-content"
            disabled={!formik.values.time}
          >
            شروع
            <FaPlay className="text-green-500 group-hover:text-neutral-content" />
          </button>
        )}
        {!!isRunning && (
          <button
            onClick={pause}
            className="group btn btn-error btn-md glass text-neutral-content"
          >
            توقف
            <FaPause className="text-red-600 group-hover:text-neutral-content" />
          </button>
        )}
        {previousTime && (
          <button className="group btn btn-info btn-md glass text-neutral-content">
            شروع مجدد
            <VscDebugRestart className="text-xl text-info group-hover:text-neutral-content" />
          </button>
        )}
      </div>
      <div className="mt-5 ">
        <FormikTimePickerInput
          formik={formik}
          disable={isRunning}
          name="time"
          className="text-center"
          placeholder="انتخاب زمان"
        />
      </div>
    </div>
  );
};

export default Timer;
