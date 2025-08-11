"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "@/utils/FormField";

export type TLogin = {
  fullName: string;
  email: string;
};

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm<TLogin>({
    defaultValues: {
      fullName: "Alex Smith",
      email: "alexmason@example.com",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: TLogin) => {
    console.log("Updated data:", data);
    setIsEditing(false); // Exit edit mode after save
  };

  const LoginDataArray = [
    {
      name: "fullName",
      title: "Full Name",
      placeholder: "Alex Smith",
      icon: [
        <Image
          key="lock"
          src="/assets/icons/lockBold.svg"
          alt="lock"
          width={16}
          height={14}
        />,
      ],
      type: "text",
    },
    {
      name: "email",
      title: "Email Address",
      placeholder: "alexmason@example.com",
      icon: [
        <Image
          key="email"
          src="/assets/icons/emailBold.svg"
          alt="email"
          width={20}
          height={16}
        />,
      ],
      type: "email",
    },
  ];

  return (
    <main className="space-y-2 flex flex-col items-center justify-center text-[#FF6F61] mt-42">
      {/* Profile Image */}
      <section className="flex justify-center w-[124px] h-[124px] mb-[22px]">
        <Image
          alt="edit"
          src="/assets/userCov.png"
          width={124}
          height={124}
          className="rounded-full"
        />
      </section>

      {/* Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[22px] w-[422px]"
        >
          {LoginDataArray.map((data, ind) => (
            <FormField
              key={ind}
              name={data.name}
              title={data.title}
              placeHolder={data.placeholder}
              icon={data.icon}
              type={data.type}
              disabled={!isEditing} // Disable input unless editing
            />
          ))}

          {/* Buttons */}
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="cursor-pointer rounded-2xl bg-[#ff6f61] font-urbanist text-white p-4 font-extrabold text-[20px] leading-[30px]"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex justify-between gap-4 ">
              <button
                type="submit"
                disabled={isSubmitting}
                  className="cursor-pointer rounded-2xl bg-[#ff6f61] font-urbanist text-white px-6 py-3 font-bold text-[18px] w-full"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset(); // Reset to original values
                  setIsEditing(false);
                }}
                  className="cursor-pointer rounded-2xl border font-urbanist text-[#ff6f61] px-6 py-3 font-bold text-[18px] w-full"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </FormProvider>
    </main>
  );
}
