import { useFormik } from "formik";
import { FC } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

interface Props {
  formik: ReturnType<typeof useFormik<any>>;
  name: string;
  placeholder?: string;
  label?: string;
  disable?: boolean;
  readOnly?: boolean;
  className?: string;
  required?: boolean;
  type?: "password" | "text";
  innerButton?: {
    onSubmit?: () => void;
    icon: any;
    type: "reset" | "submit";
    onClick?: () => void;
    disable?: boolean;
  };
  onExtraChange?: () => void;
}

const FormikTimePickerInput: FC<Props> = ({
  formik,
  name,
  className,
  disable,
  label,
  readOnly,
  required,
  placeholder,
  onExtraChange,
  innerButton,
}) => {
  const CustomInput = ({ onFocus, value, onChange }: any) => {
    return (
      <>
        {label && (
          <span className="ml-1 font-medium">
            {label} {required && <span className="text-red-600">*</span>}
          </span>
        )}
        <label
          className={`input max-sm:input-sm input-secondary input-bordered flex items-center gap-2 ${className}`}
        >
          {/* inner btn  pos left*/}
          {innerButton && innerButton.disable && (
            <button
              className="btn btn-sm btn-square btn-secondary"
              type={innerButton.type}
              onClick={innerButton?.onClick}
            >
              {innerButton.icon}
            </button>
          )}
          <input
            onFocus={onFocus}
            value={value}
            onChange={onChange}
            className="grow text-center"
            name={name}
            id={name}
            placeholder={placeholder ?? `${label} را وارد کنید`}
            disabled={disable}
            readOnly={readOnly}
          />
        </label>
      </>
    );
  };

  return (
    <DatePicker
      disableDayPicker
      format="HH:mm:ss"
      render={<CustomInput />}
      plugins={[<TimePicker />]}
      calendar={persian}
      locale={persian_fa}
      className="bg-dark"
      value={formik.values[name]}
      calendarPosition="bottom-right"
      onChange={(selectedDate) => {
        if (selectedDate) {
          formik.setFieldValue(name, selectedDate?.isValid ? selectedDate : "");
        } else {
          formik.setFieldValue(name, "");
        }
        onExtraChange?.();
      }}
    />
  );
};

export default FormikTimePickerInput;
