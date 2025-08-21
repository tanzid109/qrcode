"use client";
import FormField from '@/utils/FormField';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // ✅ FIXED
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export type TLogin = {
    password: string;
    newPassword: string;
    confirmPassword: string;
};

const Page = () => {
    const router = useRouter();
    const methods = useForm<TLogin>({
        defaultValues: {
            password: "admin123",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data: TLogin) => {
        console.log(data);
        router.push("/admin/dashboard");
    };

    const LoginDataArray = [
        {
            name: "password",
            title: "Password",
            placeholder: "Password",
            icon: [
                <Image
                    key="lock"
                    src="/assets/icons/lockBold.svg"
                    alt="lock"
                    width={16}
                    height={14}
                />,
                <Image
                    key="view"
                    src="/assets/icons/notViewBold.svg"
                    alt="view"
                    width={16}
                    height={14}
                />,
            ],
            type: "password",
        },
        {
            name: "newPassword",
            title: "New Password",
            placeholder: "New Password",
            icon: [
                <Image
                    key="lock"
                    src="/assets/icons/lockBold.svg"
                    alt="lock"
                    width={16}
                    height={14}
                />,
                <Image
                    key="view"
                    src="/assets/icons/notViewBold.svg"
                    alt="view"
                    width={16}
                    height={14}
                />,
            ],
            type: "password",
        },
        {
            name: "confirmPassword",
            title: "Confirm Password",
            placeholder: "Confirm Password",
            icon: [
                <Image
                    key="lock"
                    src="/assets/icons/lockBold.svg"
                    alt="lock"
                    width={16}
                    height={14}
                />,
                <Image
                    key="view"
                    src="/assets/icons/notViewBold.svg"
                    alt="view"
                    width={16}
                    height={14}
                />,
            ],
            type: "password",
        },
    ];

    return (
        <main>
            <div className="flex flex-col items-start justify-start text-[#1D242D]">
                <h1 className="text-[40px] font-bold text-secondary font-urbanist leading-[36px] mb-20">
                    Change Password
                </h1>
            </div>
            <div>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-[22px] w-7/12 mx-auto"
                    >
                        {LoginDataArray.map((data, ind) => (
                            <FormField
                                key={ind}
                                name={data.name}
                                title={data.title}
                                placeHolder={data.placeholder}
                                icon={data.icon}
                                type={data.type}
                            />
                        ))}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="cursor-pointer rounded-2xl bg-[#ff6f61] font-urbanist text-white p-4 font-semibold text-[16px]"
                        >
                            {isSubmitting ? "Changing..." : "Change Password"}
                        </button>
                    </form>
                </FormProvider>
            </div>
        </main>
    );
};

export default Page;
