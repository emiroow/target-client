import { apiService } from "@/service/axiosService";
import { validateSchema } from "@/utils/common/joiValidator";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Joi from "joi";
import { FaKey, FaUserTie } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormikTextInput from "../../components/common/FormikTextInput";

const SignUp = () => {
  const navigate = useNavigate();

  const schema = Joi.object({
    fullName: Joi.string().required().min(5).max(20).messages({
      "any.required": "نام و نام خانوادگی فیلد اجباری می باشد",
      "string.empty": "نام و نام خانوادگی فیلد اجباری می باشد",
      "string.min": " نام و نام خانوادگی باید بیشتر از 5 کارکتر باشد",
      "string.max": " نام و نام خانوادگی باید کمتر از 20 کارکتر باشد",
    }),
    email: Joi.string().required().min(5).max(30).messages({
      "any.required": "ایمیل فیلد اجباری می باشد",
      "string.empty": "ایمیل فیلد اجباری می باشد",
      "string.min": " ایمیل باید بیشتر از 5 کارکتر باشد",
      "string.max": " ایمیل باید کمتر از 30 کارکتر باشد",
    }),
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
    confirmPassword: Joi.any()
      .required()
      .equal(Joi.ref("password"))
      .messages({ "any.only": "پسورد تکرار شده صحیح نمیباشد" }),
  });

  const signUpFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      user: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => validateSchema(schema, values),
    onSubmit: (data) => {
      signUpMutation.mutate(data);
    },
  });

  const signUp = async (loginData: { user: string; password: string }) => {
    const data = await apiService<any>({
      method: "POST",
      path: "auth/register",
      Option: { data: loginData },
    });
    return data;
  };
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (res) => {
      if (res.status) {
        toast.success("حساب کاربری شما با موفقیت ایجاد گردید");
        navigate("/auth/login");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    // container
    <div className="w-full flex-col h-[100vh] flex justify-center items-center">
      {/* box */}
      <p className="mb-5 font-bold text-2xl">ایجاد حساب</p>
      <form
        onSubmit={signUpFormik.handleSubmit}
        onReset={signUpFormik.handleReset}
        className="w-[95%] md:w-[35%] lg:w-[25%] 2xl:w-[20%] flex flex-col gap-3 justify-center p-6 drop-shadow-2xl shadow-2xl bg-neutral rounded-lg"
      >
        <FormikTextInput
          formik={signUpFormik}
          name="fullName"
          label="نام و نام خانوادگی"
          innerIcon={{ icon: <FaUserTie />, position: "left" }}
        />
        <FormikTextInput
          formik={signUpFormik}
          name="email"
          label="ایمیل"
          innerIcon={{ icon: <LuMail />, position: "left" }}
        />
        <FormikTextInput
          formik={signUpFormik}
          name="user"
          label="نام کاربری"
          innerIcon={{ icon: <LuMail />, position: "left" }}
        />
        <FormikTextInput
          formik={signUpFormik}
          name="password"
          label="رمز عبور"
          type="password"
          innerIcon={{ icon: <FaKey />, position: "left" }}
        />
        <FormikTextInput
          formik={signUpFormik}
          name="confirmPassword"
          label="تکرار رمز عبور"
          type="password"
          innerIcon={{ icon: <FaKey />, position: "left" }}
        />
        <button type="submit" className="btn btn-secondary text-md text-white">
          {signUpMutation.isPending ? (
            <span className="loading loading-spinner loading-md text-white"></span>
          ) : (
            "ایجاد حساب"
          )}
        </button>
        <Link
          to={"/auth/login"}
          className="text-sm text-info text-center hover:underline link-hover"
        >
          ورود به حساب کاربری
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
