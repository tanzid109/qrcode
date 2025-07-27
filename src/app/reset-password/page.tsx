import React from "react";
import Link from "next/link";
import ResetPasswordForm from "./_components/resetPasswordForm";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen  text-[#FF6F61]">
      <h1 className="text-7xl font-extrabold text-secondary font-urbanist leading-[108px] mb-[72px]">
        CayTask
      </h1>
      <h1 className="text-[36px] font-bold text-secondary font-urbanist leading-[36px] mb-[36px]">
        Sign in Your Account
      </h1>
      <ResetPasswordForm />
      <Link
        href="/forgot-password"
        className="leading-6 font-bold text-[#262621] mt-[18px]"
      >
        Forgot the password?
      </Link>
    </main>
  );
}
