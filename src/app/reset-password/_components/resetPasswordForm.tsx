"use client";
import FormField from "@/utils/FormField";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export type TResetPassword = {
  password: string;
  confirmPassword: string;
};
export default function ResetPasswordForm() {
  const router = useRouter();
  const methods = useForm<TResetPassword>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: TResetPassword) => {
    console.log(data);
    router.push("/reset-password");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[22px] w-[360px] "
      >
        <section className="flex justify-between">
          {Array.from({ length: 2 }).map((_, ind) => (
            <FormField
              key={ind}
              name={`otp${ind}`}
              type="password"
              icon={[
                <Image
                  key="lock"
                  src="/assets/icons/lock.svg"
                  alt="email"
                  width={16}
                  height={14}
                />,
                <Image
                  key="view"
                  src="/assets/icons/notViewBold.svg"
                  alt="email"
                  width={16}
                  height={14}
                />,
              ]}
            />
          ))}
        </section>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-lg bg-[#ff6f61] font-urbanist text-[#F1F8FD] py-[10px] font-extrabold text-[16px] leading-[24px] mt-[10px]"
        >
          {isSubmitting ? "Reseting password..." : "Reset password"}
        </button>
      </form>
    </FormProvider>
  );
}
