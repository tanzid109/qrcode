"use client";
import React, { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "@/utils/FormField";

export type TLogin = {
  fullName: string;
  email: string;
};

export default function Page() {
  const [profileImage, setProfileImage] = useState<string>("/image/userImage.png");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileImage(newImageUrl);

      // TODO: Upload file to server if needed
      // const formData = new FormData();
      // formData.append("profilePicture", file);
      // await fetch("/api/upload-profile-picture", { method: "POST", body: formData });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: TLogin) => {
    console.log("Updated data:", data);
    setIsEditing(false); // Exit edit mode after save
  };

  const LoginDataArray = [
    {
      name: "fullName" as const,
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
      name: "email" as const,
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
    <main className="space-y-6 flex flex-col items-center justify-center text-[#FF6F61] mt-20">
      {/* Profile Image */}
      <section className="flex justify-center mb-6">
        <div
          className="relative rounded-full border cursor-pointer"
          onClick={handleImageClick}
        >
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
            <Image
              src="/assets/userCov.png"
              alt="User Profile"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 bg-[#FF6F61] rounded-full p-1 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera-icon lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
          </span>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
          accept="image/png, image/jpeg, image/jpg"
        />
      </section>

      {/* Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-[422px]"
        >
          {LoginDataArray.map((data, ind) => (
            <FormField
              key={ind}
              name={data.name}
              title={data.title}
              placeHolder={data.placeholder}
              icon={data.icon}
              type={data.type}
              disabled={!isEditing}
            />
          ))}

          {/* Buttons */}
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="cursor-pointer rounded-2xl bg-[#ff6f61] font-urbanist text-white p-4 font-extrabold text-lg"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer rounded-2xl bg-[#ff6f61] font-urbanist text-white px-6 py-3 font-bold text-lg w-full"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setIsEditing(false);
                }}
                className="cursor-pointer rounded-2xl border font-urbanist text-[#ff6f61] px-6 py-3 font-bold text-lg w-full"
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
