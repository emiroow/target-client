import { FC } from "react";
import {
  BsEye,
  BsFillPencilFill,
  BsFillTrashFill,
  BsThreeDotsVertical,
} from "react-icons/bs";

interface Props {
  data?: any;
  editBoard?: () => void;
  deleteBoard?: () => void;
}

const TodoItem: FC<Props> = ({ deleteBoard, editBoard }) => {
  return (
    <div className="w-full border p-5 rounded flex flex-row item-center justify-between">
      <div className="flex flex-row self-center item-center gap-3">
        {/* todo check */}
        <input
          type="checkbox"
          className="checkbox checkbox-sm mt-1 checkbox-secondary"
        />
        {/* todo title */}
        <span className=" font-light">عنوان تستی</span>
      </div>
      <div className="flex flex-row item-center gap-3 items-center">
        {/* time */}
        <span className="font-medium">08:35</span>
        {/* action btn s */}
        <div className="dropdown z-10">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-sm btn-square text-secondary"
          >
            <BsThreeDotsVertical className="text-lg" />
          </button>
          <ul className="menu dropdown-content bg-base-200 rounded-lg -m-[10px] mt-1 gap-3 p-1.5">
            <li>
              <button className="tooltip tooltip-right p-0" data-tip="جزئیات">
                <BsEye className="p-[8px] text-3xl text-info" />
              </button>
            </li>
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
    </div>
  );
};

export default TodoItem;
