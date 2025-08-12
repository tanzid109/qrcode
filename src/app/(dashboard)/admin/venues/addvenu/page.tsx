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
                                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-gray-400 mb-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                            />
                                        </svg>
                                        <span className="text-gray-400 text-sm">Upload</span>
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
