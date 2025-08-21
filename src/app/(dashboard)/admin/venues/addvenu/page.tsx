"use client";

import Image from "next/image";
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

interface MenuItem {
    name: string;
    description: string;
    price: string;
}

interface EditProfileManagementProps {
    onBackClick: () => void;
}

const Addvenu: React.FC<EditProfileManagementProps> = ({ onBackClick }) => {
    // --- State: form + hours (Sun..Sat so Sunday/Monday checkboxes work cleanly) ---
    const [formData, setFormData] = useState<FormData>({
        restaurantName: "",
        description: "",
        address: "",
        phoneNumber: "",
        email: "",
        operatingHours: [
            { day: "Sunday", openTime: "", closeTime: "", isOpen: true },
            { day: "Monday", openTime: "", closeTime: "", isOpen: true },
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

    // --- State: menu ---
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        { name: "", description: "", price: "" },
    ]);

    // --- Handlers: form fields ---
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // --- Handlers: operating hours ---
    const handleOperatingHoursChange = (
        index: number,
        field: keyof OperatingHour,
        value: string | boolean
    ) => {
        setFormData((prev) => {
            const newHours = [...prev.operatingHours];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (newHours[index] as any)[field] = value;
            return { ...prev, operatingHours: newHours };
        });
    };

    // --- Handlers: images ---
    const handleImageUploadClick = (index: number) => {
        fileInputRefs.current[index]?.current?.click();
    };

    const handleFileChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImages((prev) => {
                const next = [...prev];
                next[index] = imageUrl;
                return next;
            });
            console.log(`File selected for upload ${index + 1}:`, file.name);
        }
    };

    // --- Handlers: menu items ---
    const handleMenuChange = (
        index: number,
        field: keyof MenuItem,
        value: string
    ) => {
        const next = [...menuItems];
        next[index][field] = value;
        setMenuItems(next);
    };

    const addMenuItem = () => {
        setMenuItems((prev) => [...prev, { name: "", description: "", price: "" }]);
    };

    const removeMenuItem = (index: number) => {
        setMenuItems((prev) => prev.filter((_, i) => i !== index));
    };

    // --- Save ---
    const handleSave = () => {
        console.log("Saving changes:", formData);
        console.log("Uploaded images:", uploadedImages);
        console.log("Menu items:", menuItems);
        onBackClick();
    };

    // --- JSX ---
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

                    {/* venue email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-[#2C2C2C] text-sm font-bold my-2"
                        >
                            Venue Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
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
                                className="flex flex-col items-center justify-center bg-[#EFEFEF] rounded-lg p-5 cursor-pointer hover:border-blue-400 relative overflow-hidden"
                                onClick={() => handleImageUploadClick(0)}
                            >
                                {uploadedImages[0] ? (
                                    <Image
                                        src={uploadedImages[0]}
                                        alt="Uploaded Preview"
                                        fill
                                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <>
                                        <svg
                                            width="33"
                                            height="27"
                                            viewBox="0 0 33 27"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M21.8339 18.8327L16.5006 13.4994M16.5006 13.4994L11.1672 18.8327M16.5006 13.4994V25.4994M27.6872 22.0194C28.9877 21.3104 30.015 20.1886 30.6071 18.8309C31.1991 17.4732 31.3222 15.9571 30.9568 14.5217C30.5915 13.0863 29.7585 11.8134 28.5895 10.904C27.4204 9.99458 25.9817 9.50039 24.5006 9.49941H22.8206C22.417 7.9384 21.6648 6.48919 20.6205 5.26073C19.5762 4.03228 18.267 3.05654 16.7914 2.40689C15.3157 1.75723 13.712 1.45055 12.1007 1.50992C10.4895 1.56928 8.91265 1.99314 7.48879 2.74963C6.06494 3.50612 4.83111 4.57555 3.88005 5.87752C2.929 7.17949 2.28548 8.68012 1.99786 10.2666C1.71025 11.8531 1.78603 13.4841 2.21951 15.0371C2.65299 16.5901 3.43288 18.0246 4.50056 19.2327"
                                                stroke="#FF6F61"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span className="text-[#181D27] text-base">Upload Image</span>
                                        <span className="text-[#6C606C] text-base">
                                            Max file : 25 MB
                                        </span>
                                        <button className="px-5 py-1 my-2 text-white bg-[#FF6F61] rounded-2xl">
                                            Browse Files
                                        </button>
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

                    {/* -------- Menu (full section) -------- */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-extrabold">Menu</h1>
                        </div>

                        {menuItems.map((item, index) => (
                            <div key={index} className="mb-4 pb-4">
                                <div className="flex items-center justify-end gap-2 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => removeMenuItem(index)}
                                        className="flex items-center gap-2 hover:bg-white p-1 rounded-2xl"
                                    >
                                        <svg
                                            width="25"
                                            height="24"
                                            viewBox="0 0 25 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M16.5 9V19H8.5V9H16.5ZM15 3H10L9 4H5.5V6H19.5V4H16L15 3ZM18.5 7H6.5V19C6.5 20.1 7.4 21 8.5 21H16.5C17.6 21 18.5 20.1 18.5 19V7Z"
                                                fill="#FF3A3A"
                                            />
                                        </svg>
                                        <h3 className="text-[#FF3A3A] text-sm font-normal">Remove</h3>
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-[#2C2C2C] text-sm font-bold my-2">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        value={item.name}
                                        onChange={(e) => handleMenuChange(index, "name", e.target.value)}
                                        className="w-full p-3 rounded-lg bg-[#EFEFEF] text-[#2C2C2C]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#2C2C2C] text-sm font-bold my-2">
                                        Item Description
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Item Description"
                                        value={item.description}
                                        onChange={(e) =>
                                            handleMenuChange(index, "description", e.target.value)
                                        }
                                        className="w-full p-3 rounded-lg bg-[#EFEFEF] text-[#2C2C2C]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#2C2C2C] text-sm font-bold my-2">
                                        Item Price
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Item Price"
                                        value={item.price}
                                        onChange={(e) => handleMenuChange(index, "price", e.target.value)}
                                        className="w-full p-3 rounded-lg bg-[#EFEFEF] text-[#2C2C2C]"
                                    />
                                </div>
                            </div>
                        ))}

                        <div>
                            <button
                                type="button"
                                onClick={addMenuItem}
                                className="border-2 border-[#FF3A3A] w-full p-2 rounded-xl text-[#3C3C3C] flex items-center justify-center gap-2 hover:bg-[#FF3A3A] hover:text-white font-medium"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13 7.99805H8V12.998C8 13.2633 7.89464 13.5176 7.70711 13.7052C7.51957 13.8927 7.26522 13.998 7 13.998C6.73478 13.998 6.48043 13.8927 6.29289 13.7052C6.10536 13.5176 6 13.2633 6 12.998V7.99805H1C0.734784 7.99805 0.48043 7.89269 0.292893 7.70515C0.105357 7.51762 0 7.26326 0 6.99805C0 6.73283 0.105357 6.47848 0.292893 6.29094C0.48043 6.1034 0.734784 5.99805 1 5.99805H6V0.998047C6 0.73283 6.10536 0.478476 6.29289 0.29094C6.48043 0.103403 6.73478 -0.00195313 7 -0.00195312C7.26522 -0.00195313 7.51957 0.103403 7.70711 0.29094C7.89464 0.478476 8 0.73283 8 0.998047V5.99805H13C13.2652 5.99805 13.5196 6.1034 13.7071 6.29094C13.8946 6.47848 14 6.73283 14 6.99805C14 7.26326 13.8946 7.51762 13.7071 7.70515C13.5196 7.89269 13.2652 7.99805 13 7.99805Z"
                                        fill="#3C3C3C"
                                    />
                                </svg>
                                Add More Item
                            </button>
                        </div>
                    </div>

                    {/* -------- Opening Hours (time) -------- */}
                    <div>
                        <h2 className="text-xl font-bold">Opening Hours</h2>

                        {/* Sunday & Monday closed toggles (as in your design) */}
                        <div>
                            <div className="flex items-center gap-2">
                                <label className="block text-[#2C2C2C] text-sm font-bold my-2">
                                    Sunday
                                </label>
                                <input
                                    type="checkbox"
                                    onChange={(e) =>
                                        handleOperatingHoursChange(0, "isOpen", !e.target.checked)
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
                                        handleOperatingHoursChange(1, "isOpen", !e.target.checked)
                                    }
                                    className="w-5 h-5"
                                />
                                <label className="block text-[#2C2C2C] text-sm font-bold my-2">
                                    closed
                                </label>
                            </div>
                        </div>

                        {/* Table for Tuesday–Saturday (exact look preserved) */}
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full text-white">
                                <tbody>
                                    {formData.operatingHours.slice(2).map((hour, idx) => {
                                        const globalIndex = idx + 2; // shift because we sliced
                                        return (
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
                                                                globalIndex,
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
                                                                globalIndex,
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
                                                                    globalIndex,
                                                                    "isOpen",
                                                                    !e.target.checked
                                                                )
                                                            }
                                                            className="w-5 h-5"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleSave}
                            type="button"
                            className="w-full rounded-lg bg-[#FF6F61] text-white py-2 font-medium hover:bg-[#FF3A3A] hover:text-white "
                        >
                            Add
                        </button>
                        <button
                            onClick={onBackClick}
                            type="button"
                            className="w-full rounded-lg border text-black py-2 font-medium hover:bg-[#FF3A3A] hover:text-white "
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
