import FormikDatePickerInput from "@/components/common/FormikDatePickerInput";
import FormikError from "@/components/common/FormikError";
import FormikSelectInput from "@/components/common/FormikSelectInput";
import FormikTextInput from "@/components/common/FormikTextInput";
import Modal from "@/components/common/Modal";
import { apiService } from "@/service/axiosService";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { toast } from "react-toastify";
import BoardHeadSkeleton from "./components/BoardHeadSkeleton";
import BoardTargetSkeleton from "./components/BoardTargetSkeleton";
import TargetCard from "./components/TargetCard";
import useBoard from "./useBoard";

const Board = () => {
  const {
    targets,
    boardInfo,
    boardInfoLoading,
    targetsIsLoading,
    editBoardModal,
    setBoardEditModal,
    id,
    BoardFormik,
    queryClient,
    uploads,
    uploadLoader,
    setLoader,
  } = useBoard();

  return (
    <>
      {boardInfoLoading ? (
        <BoardHeadSkeleton />
      ) : (
        <div className="w-full">
          {/* Board Name */}
          <div className="w-full py-5 flex gap-3 items-center">
            <span className="w-12 h-12 text-center items-center text-2xl self-center justify-center flex rounded-full bg-secondary/10 drop-shadow-xl shadow-xl glass ">
              {boardInfo?.data?.emoji}
            </span>
            <span className="text-2xl text-secondary font-sansBold">
              {boardInfo?.data?.name}
            </span>

            {/* edit Board */}
            <button
              onClick={() => {
                setBoardEditModal({ boardId: id, boardState: true });
                BoardFormik.setValues({
                  backgroundImageUrl: boardInfo?.data?.backgroundImageUrl,
                  date: boardInfo?.data?.date,
                  emoji: boardInfo?.data?.emoji,
                  name: boardInfo?.data?.name,
                  selectBackgroundImageUrl: "",
                });
              }}
              className="btn btn-ghost btn-sm btn-circle p-1"
            >
              <BiSolidEditAlt className="text-2xl text-success" />
            </button>
          </div>

          {/* search and Filter Inputs */}
          <div className="w-full"></div>

          {/* Targets */}
          <div className="w-full px-2 flex gap-3 mt-1 pb-5 h-max overflow-x-auto scroll-smooth">
            {targetsIsLoading ? (
              <>
                <BoardTargetSkeleton />
                <BoardTargetSkeleton />
                <BoardTargetSkeleton />
              </>
            ) : (
              targets?.data?.map((item, index: number) => {
                return <TargetCard data={item} key={index} />;
              })
            )}
          </div>

          {/* edit modal */}
          <Modal
            title={`ویرایش بورد ${boardInfo?.data?.name}`}
            modalState={editBoardModal.boardState}
            modalStateSetter={setBoardEditModal}
            onCloseESC={() =>
              setBoardEditModal({ boardId: "", boardState: false })
            }
            onCloseButton={() =>
              setBoardEditModal({ boardId: "", boardState: false })
            }
            onSubmit={() => BoardFormik.handleSubmit()}
          >
            <div className="p-3 grid gap-3 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              <FormikTextInput formik={BoardFormik} name="name" label="نام" />
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
                            backgroundImage: `url("${BoardFormik.values.backgroundImageUrl}")`,
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
                          const fullUrl = `${
                            import.meta.env.VITE_FILE_BASE_URL
                          }${uploadImage.data?.url}`;
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
                <FormikError name="backgroundImageUrl" formik={BoardFormik} />
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
                  const fullUrl = `${import.meta.env.VITE_FILE_BASE_URL}${
                    e.target.value
                  }`;
                  BoardFormik.setFieldValue("backgroundImageUrl", fullUrl);
                }}
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Board;
