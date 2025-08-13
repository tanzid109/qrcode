"use client";

import React, { useState, useRef, ChangeEvent } from "react";

interface OperatingHour {
    day: string;
    openTime: string;
    closeTime: string;
    isOpen: boolean;
}

interface FormData {
    restaurantName: string;
    description: string;
    address: string;
    phoneNumber: string;
    email: string;
    operatingHours: OperatingHour[];
}

interface EditProfileManagementProps {
    onBackClick: () => void;
}

const Addvenu: React.FC<EditProfileManagementProps> = ({
    onBackClick,
}) => {
    const [formData, setFormData] = useState<FormData>({
        restaurantName: "",
        description: "",
        address: "",
        phoneNumber: "",
        email: "",
        operatingHours: [
            { day: "Tuesday", openTime: "", closeTime: "", isOpen: false },
            { day: "Wednesday", openTime: "", closeTime: "", isOpen: false },
            { day: "Thursday", openTime: "", closeTime: "", isOpen: false },
            { day: "Friday", openTime: "", closeTime: "", isOpen: false },
            { day: "Saturday", openTime: "", closeTime: "", isOpen: false },
        ],
    });

    const [uploadedImages, setUploadedImages] = useState<(string | null)[]>(
        Array(4).fill(null)
    );

    const fileInputRefs = useRef<React.RefObject<HTMLInputElement>[]>([]);
    fileInputRefs.current = Array(4)
        .fill(null)
        .map((_, i) => fileInputRefs.current[i] ?? React.createRef());

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOperatingHoursChange = (
        index: number,
        field: keyof OperatingHour,
        value: string | boolean
    ) => {
        setFormData((prev) => {
            const newHours = [...prev.operatingHours];
            (newHours[index] as any)[field] = value;
            return { ...prev, operatingHours: newHours };
        });
    };

    const handleSave = () => {
        console.log("Saving changes:", formData);
        console.log("Uploaded images:", uploadedImages);
        onBackClick();
    };

    const handleImageUploadClick = (index: number) => {
        fileInputRefs.current[index]?.current?.click();
    };

    const handleFileChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImages((prev) => {
                const newImages = [...prev];
                newImages[index] = imageUrl;
                return newImages;
            });
            console.log(`File selected for upload ${index + 1}:`, file.name);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-black p-8 font-sans rounded-lg flex flex-col items-center">
            <div className="w-full bg-[#F9FAFB] rounded-lg">
                <h1 className="text-2xl font-extrabold">Add new venue</h1>

                <div className="space-y-6">
                    {/* Venue Name */}
                    <div>
                        <label
                            htmlFor="restaurantName"
                            className="block text-[#2C2C2C] text-sm font-bold my-2"
                        >
                            Venue Name
                        </label>
                        <input
                            type="text"
                            id="restaurantName"
                            name="restaurantName"
                            placeholder="Enter Name"
                            value={formData.restaurantName}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg bg-[#EFEFEF] text-[#2C2C2C]"
                        />
                    </div>

                    {/* Venue Type */}
                    <div>
                        <label
                            htmlFor="venueType"
                            className="block text-[#2C2C2C] text-sm font-bold my-2"
                        >
                            Venue Type
                        </label>
                        <input
                            type="text"
                            id="venueType"
                            name="description"
                            placeholder="Enter Type"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg bg-[#EFEFEF] text-[#2C2C2C]"
                        />
                    </div>

                    {/* Venue Location */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-[#2C2C2C] text-sm font-bold my-2"
                        >
                            Venue Location
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter Location"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg bg-[#EFEFEF] text-[#2C2C2C]"
                        />
                    </div>

                    {/* Upload Image */}
                    <div>
                        <label className="block text-[#2C2C2C] text-sm font-bold my-2">
                            Venue Image
                        </label>
                        <div className="rounded-lg">
                            <div
                                className="flex flex-col items-center justify-center bg-[#EFEFEF] rounded-lg h-32 cursor-pointer hover:border-blue-400 relative overflow-hidden"
                                onClick={() => handleImageUploadClick(0)}
                            >
                                {uploadedImages[0] ? (
                                    <img
                                        src={uploadedImages[0]}
                                        alt="Uploaded Preview"
                                        className="absolute inset-0 w-full h-full object-cover rounded-lg "
                                    />
                                ) : (
                                    <>
                                            <svg width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.8339 18.8327L16.5006 13.4994M16.5006 13.4994L11.1672 18.8327M16.5006 13.4994V25.4994M27.6872 22.0194C28.9877 21.3104 30.015 20.1886 30.6071 18.8309C31.1991 17.4732 31.3222 15.9571 30.9568 14.5217C30.5915 13.0863 29.7585 11.8134 28.5895 10.904C27.4204 9.99458 25.9817 9.50039 24.5006 9.49941H22.8206C22.417 7.9384 21.6648 6.48919 20.6205 5.26073C19.5762 4.03228 18.267 3.05654 16.7914 2.40689C15.3157 1.75723 13.712 1.45055 12.1007 1.50992C10.4895 1.56928 8.91265 1.99314 7.48879 2.74963C6.06494 3.50612 4.83111 4.57555 3.88005 5.87752C2.929 7.17949 2.28548 8.68012 1.99786 10.2666C1.71025 11.8531 1.78603 13.4841 2.21951 15.0371C2.65299 16.5901 3.43288 18.0246 4.50056 19.2327" stroke="#FF6F61" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <span className="text-[#181D27] text-base">Upload Image</span>
                                            <span className="text-[#6C606C] text-base">Max file : 25 MB</span>
                                            <button className="px-5 py-1 my-2 text-white bg-[#FF6F61] rounded-2xl">Browse Files    </button>
                                    </>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRefs.current[0]}
                                    onChange={(e) => handleFileChange(0, e)}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </div>
                    {/* menu */}
                    <h1 className="text-2xl font-extrabold">Menu</h1>
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-[#2C2C2C] text-sm font-bold my-2"
                        >
                            Item Name
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter Name"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg bg-[#EFEFEF] text-[#2C2C2C]"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-[#2C2C2C] text-sm font-bold my-2"
                        >
                            Item Description
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Item Description"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg bg-[#EFEFEF] text-[#2C2C2C]"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-[#2C2C2C] text-sm font-bold my-2"
                        >
                            Item Price
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Item Price"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg bg-[#EFEFEF] text-[#2C2C2C]"
                        />
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h2 className="text-xl font-bold">Opening Hours</h2>
                        <div>
                            <div className="flex items-center gap-2">
                                <label className="block text-[#2C2C2C] text-sm font-bold my-2">
                                    Sunday
                                </label>
                                <input
                                    type="checkbox"
                                    onChange={(e) =>
                                        handleOperatingHoursChange(
                                            index,
                                            "isOpen",
                                            !e.target.checked
                                        )
                                    }
                                    className="w-5 h-5"
                                />
                                <label className="block text-[#2C2C2C] text-sm font-bold my-2">
                                    closed
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="block text-[#2C2C2C] text-sm font-bold my-2">
                                    Monday
                                </label>
                                <input
                                    type="checkbox"
                                    onChange={(e) =>
                                        handleOperatingHoursChange(
                                            index,
                                            "isOpen",
                                            !e.target.checked
                                        )
                                    }
                                    className="w-5 h-5"
                                />
                                <label className="block text-[#2C2C2C] text-sm font-bold my-2">
                                    closed
                                </label>
                            </div>
                        </div>
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full text-white">
                                <tbody>
                                    {formData.operatingHours.map((hour, index) => (
                                        <tr key={hour.day}>
                                            <td className="py-3 px-4 whitespace-nowrap text-sm font-bold text-black">
                                                {hour.day}
                                            </td>
                                            <td className="py-3 px-4">
                                                <input
                                                    type="time"
                                                    value={hour.openTime}
                                                    onChange={(e) =>
                                                        handleOperatingHoursChange(
                                                            index,
                                                            "openTime",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full p-2 rounded-lg bg-[#F3F3F3] border-2 border-[#B6B6B6] text-[#5D5D5D]"
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                <input
                                                    type="time"
                                                    value={hour.closeTime}
                                                    onChange={(e) =>
                                                        handleOperatingHoursChange(
                                                            index,
                                                            "closeTime",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full p-2 rounded-lg bg-[#F3F3F3] border-2 border-[#B6B6B6] text-[#5D5D5D]"
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex flex-row-reverse items-center gap-2">
                                                    <label className="block text-[#2C2C2C] text-sm font-bold my-2">
                                                        Closed
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        onChange={(e) =>
                                                            handleOperatingHoursChange(
                                                                index,
                                                                "isOpen",
                                                                !e.target.checked
                                                            )
                                                        }
                                                        className="w-5 h-5"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleSave}
                            type="button"
                            className="w-full rounded-lg bg-[#FF6F61] text-white py-2 font-medium"
                        >
                            Add
                        </button>
                        <button
                            onClick={onBackClick}
                            type="button"
                            className="w-full rounded-lg border text-black py-2 font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addvenu;
