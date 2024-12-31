import FormikDatePickerInput from "@/components/common/FormikDatePickerInput";
import FormikError from "@/components/common/FormikError";
import FormikSelectInput from "@/components/common/FormikSelectInput";
import FormikTextInput from "@/components/common/FormikTextInput";
import Modal from "@/components/common/Modal";
import { apiService } from "@/service/axiosService";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { toast } from "react-toastify";
import AddBoard from "./components/AddBoard";
import Board from "./components/Board";
import BoardSkeleton from "./components/BoardSkeleton";
import useBoards from "./useBoards";

const Boards = () => {
  const {
    boards,
    manageModal,
    setManageModal,
    isLoading,
    BoardFormik,
    createBoardMutation,
    uploads,
    queryClient,
    BoardInfoMutating,
    updateBoardMutating,
    deleteBoardMutating,
  } = useBoards();
  const [uploadLoader, setLoader] = useState(false);
  return (
    <>
      <div className="gap-3 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 flex-wrap transition-all duration-300 delay-700 transform-gpu">
        <AnimatePresence>
          {isLoading ? (
            <>
              <BoardSkeleton />
              <BoardSkeleton />
              <BoardSkeleton />
            </>
          ) : (
            boards?.data?.boardList?.map((item, index) => {
              return (
                <Board
                  editBoard={() => {
                    BoardInfoMutating.mutate(item._id);
                    setManageModal({
                      modalState: true,
                      actionType: "edit",
                      board: item._id,
                    });
                  }}
                  key={index}
                  data={item}
                  deleteBoard={() => {
                    BoardInfoMutating.mutate(item._id);
                    setManageModal({
                      modalState: true,
                      actionType: "delete",
                      board: item._id,
                    });
                  }}
                />
              );
            })
          )}
        </AnimatePresence>
        <AddBoard
          onClick={() => {
            setManageModal({
              modalState: true,
              actionType: "create",
            });
            BoardFormik.resetForm();
          }}
        />
      </div>

      {/* manage board Modal */}
      <Modal
        title={`${
          manageModal.actionType === "create"
            ? "ایجاد"
            : manageModal.actionType === "edit"
            ? "ویرایش"
            : "حذف"
        } بورد ${manageModal.actionType === "create" ? "جدید" : ""}`}
        modalState={manageModal.modalState}
        modalStateSetter={setManageModal}
        onCloseESC={() => {
          BoardFormik.resetForm();
          setManageModal({
            modalState: false,
            actionType: "",
            board: "",
          });
        }}
        onSubmit={
          manageModal.actionType === "create"
            ? () => BoardFormik.handleSubmit()
            : undefined
        }
        onCancel={
          manageModal.actionType === "create"
            ? () => BoardFormik.resetForm()
            : undefined
        }
        onEdit={
          manageModal.actionType === "edit"
            ? () => BoardFormik.handleSubmit()
            : undefined
        }
        loading={BoardInfoMutating.isPending}
        onCloseButton={() => {
          BoardFormik.resetForm();
          setManageModal({
            modalState: false,
            actionType: "",
            board: "",
          });
        }}
        onDelete={
          manageModal.actionType === "delete"
            ? () => BoardFormik.handleSubmit()
            : undefined
        }
        submitLoading={createBoardMutation.isPending}
        updateLoading={updateBoardMutating.isPending}
        deleteLoading={deleteBoardMutating.isPending}
      >
        <div className="delay-500 transition-all duration-500">
          {manageModal.actionType === "create" ||
          manageModal.actionType === "edit" ? (
            <>
              {BoardInfoMutating.isPending ? (
                <div className="w-full flex justify-center items-center p-24">
                  <span className="loading loading-spinner loading-md text-white"></span>
                </div>
              ) : (
                <div className="p-3 grid gap-3 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                  <FormikTextInput
                    formik={BoardFormik}
                    name="name"
                    label="نام"
                  />
                  <FormikTextInput
                    formik={BoardFormik}
                    name="emoji"
                    label="اموجی"
                  />
                  <FormikDatePickerInput
                    formik={BoardFormik}
                    name="date"
                    label="تاریخ"
                    required
                  />
                  <div className="sm:col-span-3">
                    <div className=" border-secondary border rounded-lg relative">
                      <label
                        htmlFor="file"
                        className=" text-center  w-full h-max p-0"
                      >
                        <div className="w-full flex justify-center p-3 gap-3 items-center hover:text-secondary cursor-pointer">
                          <span>آپلود عکس</span>
                          <RiImageAddLine className="text-xl" />
                        </div>
                        {uploadLoader && (
                          <div className="w-full p-5">
                            <span className="loading loading-ring loading-lg"></span>
                          </div>
                        )}
                        {BoardFormik.values.backgroundImageUrl && (
                          <div className="w-full bg-red-500 rounded-lg relative h-[35vh] ">
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 transform group-hover:scale-125 rounded-b-lg"
                              style={{
                                backgroundImage: `url("${
                                  import.meta.env.VITE_FILE_BASE_URL
                                }${BoardFormik.values.backgroundImageUrl}")`,
                              }}
                            ></div>
                          </div>
                        )}
                      </label>

                      {BoardFormik.values.backgroundImageUrl && (
                        <button
                          onClick={() => {
                            BoardFormik.setFieldValue("backgroundImageUrl", "");
                            BoardFormik.setFieldValue(
                              "selectBackgroundImageUrl",
                              ""
                            );
                            queryClient.refetchQueries({
                              queryKey: ["GET_UPLOADS"],
                            });
                          }}
                          className="btn btn-outline btn-xs btn-circle btn-error absolute top-14 left-3 z-50"
                        >
                          <MdClose />
                        </button>
                      )}
                      <input
                        disabled={!!BoardFormik.values.backgroundImageUrl}
                        onChange={async (event) => {
                          if (event.target.files && event.target.files[0]) {
                            const img = event.target.files[0];
                            const fd = new FormData();
                            fd.append("name", img.name);
                            fd.append("image", img);
                            setLoader(true);
                            try {
                              const uploadImage = await apiService<{
                                name: string;
                                url: string;
                                fullUrl: string;
                              }>({
                                method: "POST",
                                path: "/upload/create",
                                Option: {
                                  data: fd,
                                  headers: {
                                    "Content-Type": "multipart/form-data",
                                  },
                                },
                              });
                              const fullUrl = uploadImage.data?.url;
                              if (uploadImage.status) {
                                BoardFormik.setFieldValue(
                                  "backgroundImageUrl",
                                  fullUrl
                                );
                              } else {
                                toast.error(uploadImage.massage);
                              }
                            } catch (error) {
                              toast.error("خطا در آپلود عکس");
                            }
                            setLoader(false);
                          }
                        }}
                        type="file"
                        id="file"
                        dir="ltr"
                        className="col-span-3 file-input file-input-bordered file-input-secondary hidden"
                      />
                    </div>
                    <FormikError
                      name="backgroundImageUrl"
                      formik={BoardFormik}
                    />
                  </div>
                  <FormikSelectInput
                    options={
                      uploads?.data?.map((item: any) => {
                        return { label: item.name, value: item.url };
                      }) || []
                    }
                    formik={BoardFormik}
                    name="selectBackgroundImageUrl"
                    label="انتخاب عکس"
                    placeholder="عکس مورد نظر خودرا انتخاب کنید"
                    className="sm:col-span-3"
                    disable={!!BoardFormik.values.backgroundImageUrl}
                    disableRemoveBtn={!BoardFormik.values.backgroundImageUrl}
                    onExtraChange={(e) => {
                      const fullUrl = e.target.value;
                      BoardFormik.setFieldValue("backgroundImageUrl", fullUrl);
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {BoardInfoMutating.isPending ? (
                <div className="w-full flex justify-center items-center p-24">
                  <span className="loading loading-spinner loading-md text-white"></span>
                </div>
              ) : (
                <div className="text-center mt-10 text-xl mb-5">
                  <span> آیا از خذف بورد </span>
                  <span className="text-secondary font-bold">
                    {BoardFormik.values.name}
                  </span>
                  <span> مطمئن هستید ؟</span>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>

      {/* delete Board  */}
    </>
  );
};

export default Boards;
