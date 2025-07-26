import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
export default function FormField({
  name,
  title,
  placeHolder,
  icon,
  type = "text",
}: {
  name: string;
  title: string;
  placeHolder: string;
  icon: React.ReactNode[];
  type: string;
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
    <main className="w-[422px] flex flex-col gap-[6px]">
      <label htmlFor={name} className="text-[16px] font-bold ">
        {title}
      </label>
      <section className="flex justify-between items-center p-5 rounded-2xl gap-3 bg-[#efef56]">
        <div className="flex gap-3">
          {icon?.[0] && <div className="">{icon?.[0]}</div>}
          <input
            type={inputType}
            id={name}
            {...register(name)}
            placeholder={placeHolder}
            className="text-[14px] font-medium outline-none w-"
          />
        </div>
        {type === "password" && icon?.[1] && (
          <button type="button" onClick={handleTogglePassword} className="">
            {icon?.[1]}
          </button>
        )}
      </section>
      {errors[name] && (
        <p className="">{`(${errors[name]?.message as string})`}</p>
      )}
    </main>
  );
}
