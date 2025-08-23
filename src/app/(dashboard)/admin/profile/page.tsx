"use client";
import React, { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";

export type TLogin = {
  fullName: string;
  email: string;
};

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string>("/assets/userCov.png");
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
    // Only allow image change when editing
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const onSubmit = async (data: TLogin) => {
    try {
      console.log("Updated data:", data);

      // TODO: Send data to server
      // await fetch("/api/update-profile", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data)
      // });

      setIsEditing(false); // Exit edit mode after successful save
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    reset(); // Reset form to original values
    setIsEditing(false);
    // Reset profile image to original if changed
    setProfileImage("/assets/userCov.png");
  };

  const profileFormFields = [
    {
      name: "fullName" as const,
      title: "Full Name",
      placeholder: "Enter your full name",
      icon: [
        <Image
          key="user"
          src="/assets/icons/userBold.svg" // Changed from lock to user icon
          alt="user"
          width={16}
          height={16}
        />,
      ],
      type: "text",
    },
    {
      name: "email" as const,
      title: "Email Address",
      placeholder: "Enter your email address",
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
          className={`relative rounded-full border ${isEditing ? "cursor-pointer hover:opacity-80" : "cursor-default"
            } transition-opacity`}
          onClick={handleImageClick}
        >
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
            <Image
              src={profileImage}
              alt="User Profile"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          </div>

          {/* Camera icon only shows when editing */}
          {isEditing && (
            <span className="absolute bottom-0 right-0 bg-[#FF6F61] rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </span>
          )}
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
          {profileFormFields.map((field, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label className="font-medium text-sm text-[#FF6F61]">
                {field.title}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center">
                  {field.icon}
                </div>
                <input
                  {...methods.register(field.name)}
                  type={field.type}
                  placeholder={field.placeholder}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl font-urbanist text-base
                    ${!isEditing
                    ? 'bg-gray-100 text-[#FF6F61] cursor-not-allowed border-gray-200'
                    : 'bg-white text-[#FF6F61] border-gray-300 focus:border-[#ff6f61] focus:ring-2 focus:ring-[#ff6f61]/20 focus:outline-none'
                    }
                    transition-colors duration-200`}
                />
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="cursor-pointer rounded-2xl bg-[#ff6f61] hover:bg-[#e55d50] font-urbanist text-white p-4 font-extrabold text-lg transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer rounded-2xl bg-[#ff6f61] hover:bg-[#e55d50] disabled:opacity-50 disabled:cursor-not-allowed font-urbanist text-white px-6 py-3 font-bold text-lg w-full transition-colors"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="cursor-pointer rounded-2xl border border-[#ff6f61] hover:bg-[#ff6f61] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-urbanist text-[#ff6f61] px-6 py-3 font-bold text-lg w-full transition-colors"
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