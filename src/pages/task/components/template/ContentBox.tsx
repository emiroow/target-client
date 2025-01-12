import React, { FC } from "react";

interface Props {
  children: React.ReactElement;
}
const ContentBox: FC<Props> = ({ children }) => {
  return (
    <div className=" w-[95%]  md:w-[60%] lg:w-[50%] 2xl:w-[40%] m-auto flex gap-4 flex-col">
      {/* content */}
      <div className="rounded-lg flex flex-col gap-3">{children}</div>
    </div>
  );
};

export default ContentBox;
