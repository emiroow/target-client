import { FC } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
interface Props {
  onClick: () => void;
}
const AddBoard: FC<Props> = ({ onClick }) => {
  return (
    <div
      className="h-[15.6vh] max-sm:w-[100%] 
      relative rounded-xl p-3 bg-center bg-no-repeat border-secondary  border-2 hover:cursor-pointer group justify-center flex items-center"
      onClick={onClick ?? onClick}
    >
      <div className="flex-col gap-2 flex justify-center items-center text-center self-center">
        <MdOutlineCreateNewFolder className="text-4xl text-secondary text-center" />
        <span className="font-sansMedium text-sm">ایجاد بورد جدید</span>
      </div>
    </div>
  );
};

export default AddBoard;
