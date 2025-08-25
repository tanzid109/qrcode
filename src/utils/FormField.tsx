"use client";
import React, { useState, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title?: string;
  placeHolder?: string;
  icon?: React.ReactNode[];
  type?: string;
  inputCls?: string;
  innerInputCls?: string;
  registerLogic?: object;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      name,
      title,
      placeHolder,
      icon,
      type = "text",
      inputCls,
      innerInputCls,
      registerLogic,
      ...rest
    },
    ref
  ) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const [inputType, setInputType] = useState(type);

    const handleTogglePassword = () => {
      if (type === "password") {
        setInputType((prev) =>
          prev === "password" ? "text" : "password"
        );
      }
    };

    return (
      <main className={title ? "flex flex-col gap-[6px]" : ""}>
        {title && (
          <label htmlFor={name} className="text-[16px] font-bold">
            {title}
          </label>
        )}

        <section
          className={
            inputCls
              ? inputCls
              : "flex justify-between items-center p-5 rounded-2xl gap-3 bg-[#EFEFEF]"
          }
        >
          <div className={icon ? "flex gap-3" : ""}>
            {icon?.[0] && <div>{icon[0]}</div>}

            <input
              type={inputType}
              id={name}
              {...register(name, registerLogic)} // ✅ correct
              ref={ref} // ✅ forwardRef for OTP focus
              placeholder={placeHolder}
              className={
                innerInputCls
                  ? innerInputCls
                  : "text-[14px] font-medium outline-none"
              }
              {...rest} // ✅ allows onKeyUp, inputMode, etc.
            />
          </div>

          {type === "password" && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className=""
            >
              {inputType === "password" ? (
                <Image
                  src="/assets/icons/notViewBold.svg"
                  alt="Hide password"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/assets/icons/viewBold.svg"
                  alt="Show password"
                  width={20}
                  height={20}
                />
              )}
            </button>
          )}
        </section>

        {errors[name] && (
          <p className="">{`(${errors[name]?.message as string})`}</p>
        )}
      </main>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;
