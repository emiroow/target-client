import { IBoard } from "@/interfaces/response/IBoard";
import { apiService } from "@/service/axiosService";
import { validateSchema } from "@/utils/common/joiValidator";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";

const useBoards = () => {
  const [createBoardModal, setCreateBoardModal] = useState(false);

  const getBoards = async () => {
    const data = await apiService<IBoard[]>({
      path: "/board/list",
      method: "GET",
    });
    return data;
  };
  const { data: boards, isLoading } = useQuery({
    queryKey: ["GET_BOARDS"],
    queryFn: getBoards,
  });
  const schema = Joi.object({
    // backgroundImageUrl: Joi.string().required().messages({
    //   "any.required": "عکس بکگراند فیلد اجباری می باشد",
    //   "string.empty": "عکس بکگراند فیلد اجباری می باشد",
    // }),
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
  });
  const createBoardFormik = useFormik<IBoard>({
    validate: (value) => validateSchema(schema, value),
    initialValues: {
      backgroundImageUrl: "",
      date: "",
      emoji: "",
      name: "",
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  return {
    boards,
    isLoading,
    createBoardModal,
    setCreateBoardModal,
    createBoardFormik,
  };
};

export default useBoards;