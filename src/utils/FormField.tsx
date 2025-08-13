import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

export default function FormField({
  name,
  title,
  placeHolder,
  icon,
  type = "text",
  inputCls,
  innerInputCls,
  registerLogic,
}: {
  name?: string;
  title?: string;
  placeHolder?: string;
  icon?: React.ReactNode[]; // First = leading icon
  type: string;
  inputCls?: string;
  innerInputCls?: string;
  registerLogic?: object;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [inputType, setInputType] = useState(type);

  const handleTogglePassword = () => {
    if (type === "password") {
      setInputType((prev) => (prev === "password" ? "text" : "password"));
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
          {/* First icon (lock, email, etc.) */}
          {icon?.[0] && <div>{icon[0]}</div>}

          {/* Input */}
          <input
            type={inputType}
            id={name}
            {...(register(name!), registerLogic)}
            placeholder={placeHolder}
            className={
              innerInputCls
                ? innerInputCls
                : "text-[14px] font-medium outline-none"
            }
          />
        </div>

        {/* Password toggle button */}
        {type === "password" && (
          <button type="button" onClick={handleTogglePassword} className="">
            {inputType === "password" ? (
              <Image
                src="/assets/icons/notViewBold.svg" // crossed eye
                alt="Hide password"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/assets/icons/viewBold.svg" // open eye
                alt="Show password"
                width={20}
                height={20}
              />
            )}
          </button>
        )}
      </section>

      {/* Error message */}
      {errors[name!] && (
        <p className="">{`(${errors[name!]?.message as string})`}</p>
      )}
    </main>
  );
}
