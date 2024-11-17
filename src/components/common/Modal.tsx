import { AnimatePresence, motion } from "framer-motion";
import React, { FC } from "react";
import { MdClose } from "react-icons/md";

interface Props {
  modalState: boolean;
  loading?: boolean;
  modalStateSetter: any;
  title?: string;
  onCancel?: () => void;
  onDelete?: () => void;
  onSubmit?: () => void;
  onCloseButton?: () => void;
  onCloseESC?: () => void;
  onEdit?: () => void;
  onCloseBackDrop?: () => void;
  children: React.ReactElement;
  contentClass?: string;
  submitLoading?: boolean;
  deleteLoading?: boolean;
  updateLoading?: boolean;
  size?: "w-1/5" | "w-2/5" | "w-3/5" | "w-4/5" | "w-5/5";
}
const Modal: FC<Props> = ({
  modalState,
  children,
  title,
  modalStateSetter,
  contentClass,
  onCloseButton,
  onCloseESC,
  onCancel,
  onSubmit,
  size,
  submitLoading = false,
  updateLoading = false,
  deleteLoading = false,
  loading = false,
  onEdit,
  onDelete,
  onCloseBackDrop,
}) => {
  if (modalState) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <AnimatePresence>
      {modalState && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0, 0.71, 0.2, 1.01] }}
        >
          {/* container */}
          <div className="w-full h-[100vh] overflow-x-hidden overflow-y-auto fixed justify-center items-center content-center inset-0 z-30 outline-none focus:outline-none bg-black/40 top-0 left-0">
            {/* box */}
            <div
              className={`max-sm:w-[95%] ${
                size ? `${size}` : "md:w-[60%] lg:w-[50%] 2xl:w-[40%]"
              } bg-base-300 border-secondary border-2 rounded-xl z-50 m-auto drop-shadow-lg shadow-lg shadow-black/30 `}
            >
              {/* head */}
              {title || onCloseESC ? (
                <div
                  className={`p-4 border-secondary flex flex-row  justify-end items-center ${
                    !title === true && !onCloseESC === false
                      ? ""
                      : !title === false && !onCloseESC === true
                      ? ""
                      : "border-b-2"
                  }`}
                >
                  {/* title */}
                  {title && (
                    <h3 className="font-bold text-md w-full">{title}</h3>
                  )}
                  {/* ESC btn */}
                  {onCloseESC && (
                    <button
                      onClick={() => {
                        modalStateSetter(false);
                        onCloseESC?.();
                      }}
                      className="btn btn-xs btn-circle btn-outline btn-error"
                    >
                      <MdClose />
                    </button>
                  )}
                </div>
              ) : null}

              {/* content */}
              <div className={`w-full p-2 ${contentClass}`}>
                {loading ? (
                  <div className="w-full flex justify-center h-[30vh]">
                    <span className="loading loading-ring loading-lg"></span>
                  </div>
                ) : (
                  children
                )}
              </div>
              {/* action btn,s */}
              {!loading && (
                <div className="w-full flex justify-end gap-3 p-5">
                  {onSubmit && (
                    <button
                      onClick={onSubmit}
                      className="btn btn-success btn-sm text-white"
                      type="submit"
                    >
                      {submitLoading ? (
                        <span className="loading loading-spinner loading-md text-white"></span>
                      ) : (
                        "ثبت"
                      )}
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={onEdit}
                      className="btn btn-success btn-sm text-white"
                      type="submit"
                    >
                      {updateLoading ? (
                        <span className="loading loading-spinner loading-md text-white"></span>
                      ) : (
                        "ویرایش"
                      )}
                    </button>
                  )}
                  {onCancel && (
                    <button
                      onClick={onCancel}
                      className="btn btn-error btn-sm text-white"
                    >
                      انصراف
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={onDelete}
                      className="btn btn-error btn-sm text-white"
                    >
                      {deleteLoading ? (
                        <span className="loading loading-spinner loading-md text-white"></span>
                      ) : (
                        "حذف"
                      )}
                    </button>
                  )}
                  {onCloseButton && (
                    <button
                      onClick={() => {
                        modalStateSetter(false);
                        onCloseButton?.();
                      }}
                      className="btn btn-secondary btn-sm text-white"
                    >
                      بستن
                    </button>
                  )}
                </div>
              )}
            </div>
            {/* back Drop */}
            <div
              onClick={() => {
                modalStateSetter(false);
                onCloseBackDrop?.();
              }}
              className=" w-full h-full fixed top-0 -z-40"
            ></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
