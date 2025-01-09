import FormikTimePickerInput from "@/components/common/FormikTimePickerInput";
import { useFormik } from "formik";
import { useState } from "react";
import { useTimer } from "react-timer-hook";

const Timer = () => {
  const [time, setTime] = useState(new Date());

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
    onExpire: () => {
      console.log("first");
    },
  });

  const formik = useFormik<{ time: string }>({
    initialValues: { time: "" },
    onSubmit: () => {},
  });
  console.log(formik.values.time);
  return (
    <div className="flex justify-center flex-col items-center shrink-0">
      <div className="w-full text-center justify-center items-center flex flex-row-reverse md:text-8xl text-5xl md:gap-5 gap-1 mt-[250px] max-md:font-bold">
        <span className="flex items-center justify-center  w-[100px] h-[100px] md:w-[170px]  md:h-[200px] rounded-lg text-center glass ">
          {days}
        </span>
        :
        <span className="flex items-center justify-center w-[100px] h-[100px] md:w-[170px] md:h-[200px] rounded-lg text-center glass">
          {hours}
        </span>
        :
        <span className="flex items-center justify-center w-[100px] h-[100px] md:w-[170px] md:h-[200px] rounded-lg text-center glass">
          {minutes}
        </span>
        :
        <span className="flex items-center justify-center w-[100px] h-[100px] md:w-[170px] md:h-[200px] rounded-lg text-center glass">
          {seconds}
        </span>
      </div>
      <div className="w-full justify-center mt-16 flex gap-3">
        {!isRunning && (
          <button
            onClick={resume}
            className="btn btn-warning btn-md glass text-neutral-content"
          >
            ادامه
          </button>
        )}
        {!isRunning && (
          <button
            onClick={start}
            className="btn btn-success btn-md glass text-neutral-content"
          >
            شروع
          </button>
        )}
        {!!isRunning && (
          <button
            onClick={pause}
            className="btn btn-error btn-md glass text-neutral-content"
          >
            توقف
          </button>
        )}
        <button className="btn btn-info btn-md glass text-neutral-content">
          شروع مجدد
        </button>
      </div>
      <div className="mt-5 ">
        <FormikTimePickerInput
          formik={formik}
          name="time"
          className="text-center"
          placeholder="انتخاب زمان"
        />
      </div>
    </div>
  );
};

export default Timer;
