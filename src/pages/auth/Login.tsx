import FormikTextInput from "@/components/common/FormikTextInput";
import { ILoginResponse } from "@/interfaces/response/ILogin";
import { apiService } from "@/service/axiosService";
import useAuth from "@/store/useAuth";
import { validateSchema } from "@/utils/common/joiValidator";
import { setHashedLocalStorage } from "@/utils/helpers/hash.helper";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Joi from "joi";
import { FaKey, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuth((state) => state.setUser);
  const setLoginStatus = useAuth((state) => state.setLoginStatus);

  const schema = Joi.object({
    user: Joi.string().min(4).required().messages({
      "any.required": "نام کاربری فیلد اجباری می باشد",
      "string.empty": "نام کاربری فیلد اجباری می باشد",
      "string.min": "نام کابری باید بیشتر از 4 کارکتر باشد",
    }),
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$"))
      .required()
      .messages({
        "any.required": "رمز عبور فیلد اجباری می باشد",
        "string.pattern.base": "رمز عبور باید حداقل یک حرف و یک عدد داشته باشد",
        "string.empty": "رمز عبور فیلد اجباری می باشد",
        "string.min": "رمز عبور باید بیشتر از 8 کارکتر باشد",
        "string.max": "رمز عبور باید کمتر از 30 کارکتر باشد",
      }),
  });

  const loginFormik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    validate: (value) => validateSchema(schema, value),
    onSubmit: (value) => {
      loginMutation.mutate(value);
    },
  });

  const login = async (loginData: { user: string; password: string }) => {
    const data = await apiService<ILoginResponse>({
      method: "POST",
      path: "auth/login",
      Option: { data: loginData },
    });
    return data;
  };
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.status) {
        toast.success(res.massage);
        setHashedLocalStorage("TodoApp", res.data);
        setLoginStatus(true);
        setUser(res.data?.user);
        navigate("/");
      }
    },
  });

  return (
    // container
    <div className="w-full flex-col h-[100vh] flex justify-center items-center">
      {/* box */}
      <p className="mb-5 font-bold text-2xl">ورود</p>
      <form
        onSubmit={loginFormik.handleSubmit}
        onReset={loginFormik.handleReset}
        className="w-[95%] md:w-[35%] lg:w-[25%] 2xl:w-[20%] flex flex-col gap-3 justify-center p-6 drop-shadow-2xl shadow-2xl bg-neutral rounded-lg"
      >
        <FormikTextInput
          formik={loginFormik}
          name="user"
          label="نام کاربری"
          placeholder="نام کاربری خود را وارد کنید"
          innerIcon={{ icon: <FaUserTie />, position: "left" }}
        />
        <FormikTextInput
          formik={loginFormik}
          name="password"
          label="پسورد"
          type="password"
          placeholder="پسورد خود را وارد کنید"
          innerIcon={{ icon: <FaKey />, position: "left" }}
        />
        <button
          type="submit"
          className="btn btn-secondary text-md"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <span className="loading loading-spinner loading-md text-white"></span>
          ) : (
            <span className="text-white">ورود</span>
          )}
        </button>
        <Link
          to={"/auth/signup"}
          className="text-sm text-info text-center link-hover"
        >
          ایجاد حساب کابری
        </Link>
      </form>
    </div>
  );
};

export default Login;
