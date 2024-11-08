import { BoardList } from "@/interfaces/response/IBoard";
import { ITargetResponse } from "@/interfaces/response/ITarget";
import { apiService } from "@/service/axiosService";
import { validateSchema } from "@/utils/common/joiValidator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const useBoard = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [uploadLoader, setLoader] = useState(false);

  const [editBoardModal, setBoardEditModal] = useState({
    boardId: id,
    boardState: false,
  });

  const schema = Joi.object({
    backgroundImageUrl: Joi.string().required().messages({
      "any.required": "عکس بکگراند فیلد اجباری می باشد",
      "string.empty": "عکس بکگراند فیلد اجباری می باشد",
    }),
    emoji: Joi.string()
      .pattern(/^\p{Emoji}$/u)
      .required()
      .messages({
        "any.required": "اموجی فیلد اجباری می باشد",
        "string.empty": "اموجی فیلد اجباری می باشد",
        "string.pattern.base": "فقط اموجی میتوانید استفاده کنید",
        // "string.max": "فقط یک اموجی میتوانید وارد کنید",
      }),
    name: Joi.string().required().messages({
      "any.required": "نام بورد فیلد اجباری می باشد",
      "string.empty": "نام بورد فیلد اجباری می باشد",
    }),
    date: Joi.string().required().messages({
      "any.required": "تاریخ فیلد اجباری می باشد",
      "string.empty": "تاریخ فیلد اجباری می باشد",
    }),
    selectBackgroundImageUrl: Joi.allow("").optional().messages({
      "string.base": "آدرس بکگراند باید یک رشته باشد",
    }),
  });

  const BoardFormik = useFormik<{
    backgroundImageUrl?: string;
    date?: string;
    emoji?: string;
    name?: string;
    selectBackgroundImageUrl?: string;
  }>({
    validate: (value) => validateSchema(schema, value),
    initialValues: {
      backgroundImageUrl: "",
      date: "",
      emoji: "",
      name: "",
      selectBackgroundImageUrl: "",
    },
    onSubmit: (formData) => {
      const data = structuredClone(formData);
      delete data.selectBackgroundImageUrl;
      updateBoardMutating.mutate({
        id,
        body: data,
      });
    },
  });

  const getTargets = async () => {
    const data = await apiService<ITargetResponse[]>({
      method: "GET",
      path: "target/list",
      Option: { params: { board: id } },
    });
    return data;
  };
  const { data: targets, isLoading: targetsIsLoading } = useQuery({
    queryKey: ["GET_TARGETS"],
    enabled: !!id,
    queryFn: getTargets,
  });

  const getBoardInfo = async () => {
    const data = await apiService<BoardList>({
      method: "GET",
      path: "board/info",
      Option: {
        params: {
          board: id,
        },
      },
    });
    return data;
  };
  const { data: boardInfo, isPending: boardInfoLoading } = useQuery({
    queryKey: ["get-board-info"],
    queryFn: getBoardInfo,
  });

  const updateBoard = async (queryData: { id?: string; body?: any }) => {
    const data = apiService<any>({
      method: "PUT",
      path: `board/update/${queryData.id}`,
      Option: { data: queryData.body },
    });
    return data;
  };
  const updateBoardMutating = useMutation({
    mutationFn: updateBoard,
    onSuccess: (response) => {
      BoardFormik.resetForm();
      queryClient.fetchQuery({ queryKey: ["get-board-info"] });
      setBoardEditModal({ boardId: "", boardState: false });
      if (response.status) {
        toast.success(response.massage);
      }
    },
  });

  const getUploadList = async () => {
    const data = await apiService<any>({
      path: "upload/list",
      method: "GET",
    });
    return data;
  };
  const { data: uploads } = useQuery({
    queryKey: ["GET_UPLOADS", setBoardEditModal],
    queryFn: getUploadList,
    refetchOnMount: true,
  });

  return {
    targets,
    targetsIsLoading,
    boardInfo,
    boardInfoLoading,
    editBoardModal,
    setBoardEditModal,
    id,
    BoardFormik,
    queryClient,
    uploads,
    uploadLoader,
    setLoader,
  };
};

export default useBoard;
