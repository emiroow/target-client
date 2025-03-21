import { DIFFICULTY_STATUS } from "@/constant/enums";
import { BoardList } from "@/interfaces/response/IBoard";
import { ITargetResponse } from "@/interfaces/response/ITarget";
import { apiService } from "@/service/axiosService";
import { targetDifficultyDecider } from "@/utils/common/deciders";
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

  const [editTargetModal, setEditTargetModal] = useState<{
    isOpen: boolean;
    targetId?: string;
  }>({
    isOpen: false,
    targetId: "",
  });

  const [deleteTargetModal, setDeleteTargetModal] = useState<{
    isOpen: boolean;
    targetId?: string;
  }>({
    isOpen: false,
    targetId: "",
  });

  const [editBoardModal, setBoardEditModal] = useState({
    boardId: id,
    boardState: false,
  });

  const [createTarget, setCreateTarget] = useState(false);

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

  const difficultyValues = Object.values(DIFFICULTY_STATUS);

  const createTargetSchema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "عنوان نباید خالی باشد",
      "any.required": "عنوان الزامی است",
    }),
    subTitle: Joi.string().required().messages({
      "string.empty": "زیر عنوان نباید خالی باشد",
      "any.required": "زیر عنوان الزامی است",
    }),
    description: Joi.string().required().messages({
      "string.empty": "توضیحات نباید خالی باشد",
      "any.required": "توضیحات الزامی است",
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
    difficulty: Joi.string()
      .valid(...difficultyValues)
      .required()
      .messages({
        "string.empty": "سطح نباید خالی باشد",
        "any.only": `سطح باید یکی از مقادیر ${difficultyValues.join(
          ", "
        )} باشد`,

        "any.required": "سطح سختی الزامی است",
      }),
  })
    .unknown(false)
    .error((errors) => {
      errors.forEach((err) => {
        const errorDetail = err as any;
        if (errorDetail.code === "object.unknown") {
          errorDetail.message = `فیلد اضافی "${errorDetail.local?.label}" مجاز نیست`;
        }
      });
      return errors;
    });

  const createTargetFormik = useFormik<{
    title?: string;
    subTitle?: string;
    description?: string;
    emoji?: string;
    difficulty?: string;
  }>({
    initialValues: {
      description: "",
      difficulty: "",
      emoji: "",
      subTitle: "",
      title: "",
    },
    validate: (value) => validateSchema(createTargetSchema, value),
    onSubmit: (data) => {
      createTargetServiceMutation.mutate(data);
    },
  });

  const editTargetFormik = useFormik<{
    title?: string;
    subTitle?: string;
    description?: string;
    emoji?: string;
    difficulty?: string;
  }>({
    initialValues: {
      description: "",
      difficulty: "",
      emoji: "",
      subTitle: "",
      title: "",
    },
    validate: (value) => validateSchema(createTargetSchema, value),
    onSubmit: (data) => {
      updateTargetMutating.mutate({ body: data, id: editTargetModal.targetId });
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

  const updateTarget = async (queryData: { id?: string; body?: any }) => {
    const data = apiService<any>({
      method: "PUT",
      path: `target/update/${queryData.id}`,
      Option: { data: queryData.body },
    });
    return data;
  };
  const updateTargetMutating = useMutation({
    mutationFn: updateTarget,
    onSuccess: (response) => {
      editTargetFormik.resetForm();
      queryClient.fetchQuery({ queryKey: ["GET_TARGETS"] });
      setEditTargetModal({ isOpen: false, targetId: "" });
      if (response.status) {
        toast.success(response.massage);
      }
    },
  });

  const getTargetInfo = async (board?: string) => {
    const data = apiService<ITargetResponse>({
      method: "GET",
      path: `target/info/${board}`,
    });
    return data;
  };
  const targetInfoMutating = useMutation({
    mutationFn: getTargetInfo,
    onSuccess: (response) => {
      editTargetFormik.setValues({
        description: response.data?.description,
        difficulty: response.data?.difficulty,
        emoji: response.data?.emoji,
        subTitle: response.data?.subTitle,
        title: response.data?.title,
      });
    },
  });

  const deleteTarget = async (id?: string) => {
    const data = apiService<any>({
      method: "DELETE",
      path: `target/delete/${id}`,
    });
    return data;
  };
  const deleteTargetMutating = useMutation({
    mutationFn: deleteTarget,
    onSuccess: (response) => {
      queryClient.fetchQuery({ queryKey: ["GET_TARGETS"] });
      setDeleteTargetModal({
        isOpen: false,
        targetId: "",
      });
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
    enabled: editBoardModal.boardState,
    refetchOnMount: true,
  });

  const createTargetService = async (body: object) => {
    const data = await apiService({
      path: "target/create",
      method: "POST",
      Option: { data: body, params: { board: id } },
    });
    return data;
  };
  const createTargetServiceMutation = useMutation({
    mutationFn: createTargetService,
    onSuccess: (response) => {
      createTargetFormik.resetForm();
      queryClient.fetchQuery({ queryKey: ["GET_TARGETS"] });
      setCreateTarget(false);
      if (response.status) {
        toast.success(response.massage);
      }
    },
  });

  const difficultyOptionInputArray = Object.values(DIFFICULTY_STATUS).map(
    (item): any => {
      return { label: targetDifficultyDecider(item), value: item };
    }
  );

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
    createTarget,
    setCreateTarget,
    createTargetFormik,
    difficultyOptionInputArray,
    createTargetServiceMutation,
    editTargetModal,
    setEditTargetModal,
    editTargetFormik,
    updateTargetMutating,
    targetInfoMutating,
    deleteTargetModal,
    setDeleteTargetModal,
    deleteTargetMutating,
  };
};

export default useBoard;
