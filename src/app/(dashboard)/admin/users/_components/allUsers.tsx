"use client";

import DataTable, { DataRow } from "@/components/table/dataTable";
import Image from "next/image";
import React, { useState, useRef } from "react";

interface IUserEvent {
  icon: string;
  onClick: () => void;
}

interface IUserTable extends DataRow {
  "Serial ID": string;
  Name: string;
  Email: string;
  "Joining Date": Date;
  "Gitft Sent": number;
  "Gift Received": number;
  action: {
    events: IUserEvent[];
  };
}

export default function AllUser() {
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserTable | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBlockClick = (user: IUserTable) => {
    setSelectedUser(user);
    setIsBlockModalOpen(true);
  };

  const handleProfileClick = (user: IUserTable) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };

  const closeModal = () => {
    setIsBlockModalOpen(false);
    setIsProfileModalOpen(false);
    setSelectedUser(null);
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  const allUserTableData: IUserTable[] = Array.from({ length: 60 }, (_, i) => ({
    "Serial ID": `${1223 + i}`,
    Name: "John Doe",
    Email: "example@gmail.com",
    "Joining Date": new Date("jun 10, 2025"),
    "Gitft Sent": 16,
    "Gift Received": 16,
    action: {
      events: [
        {
          icon: "/assets/icons/block.svg",
          onClick: () => handleBlockClick({ "Serial ID": `${1223 + i}`, Name: "John Doe", Email: "example@gmail.com", "Joining Date": new Date("jun 10, 2025"), "Gitft Sent": 16, "Gift Received": 16, action: { events: [] } }),
        },
        {
          icon: "/assets/icons/eye.svg",
          onClick: () => handleProfileClick({ "Serial ID": `${1223 + i}`, Name: "John Doe", Email: "example@gmail.com", "Joining Date": new Date("jun 10, 2025"), "Gitft Sent": 16, "Gift Received": 16, action: { events: [] } }),
        },
      ],
    },
  }));

  return (
    <main className="">
      <section className="rounded-xl shadow-2xl">
        <DataTable data={allUserTableData} />
      </section>

      {isProfileModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50  flex justify-center items-center" onClick={handleOutsideClick} >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative" ref={modalRef}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#FF6F61]">User Details</h2>
              <button className="text-[#FF6F61] text-2xl" onClick={closeModal}>X</button>
            </div>
            <div className="text-center mb-4">
              <Image
                src="/assets/Image.jpg"
                alt="profile"
                width={150}
                height={100}
                className="rounded-xl mx-auto mb-4 object-fill"
              />
              <p className="font-semibold text-[#FF6F61]"> {selectedUser.Name}</p>
            </div>
            <div className="text-sm text-gray-600 mb-6">
              <div className="flex font-semibold justify-between items-center mb-2 border-b border-gray-200 pb-2">
                <span className="">Email:</span>
                <p>{selectedUser.Email}</p>
              </div>
              <div className="flex font-semibold justify-between items-center mb-2 border-b border-gray-200 pb-2">
                <span className="">Joining Date:</span>
                <p>{selectedUser["Joining Date"].toDateString()}</p>
              </div>
              <div className="flex font-semibold justify-between items-center mb-2 border-b border-gray-200 pb-2">
                <span className="">Gifts Sent:</span>
                <p> {selectedUser["Gitft Sent"]}</p>
              </div>
              <div className="flex font-semibold justify-between items-center mb-2 border-b border-gray-200 pb-2">
                <span className="">Gifts Received:</span>
                <p>{selectedUser["Gift Received"]}</p>
              </div>
            </div>
            {/* <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Block
              </button>
            </div> */}
          </div>
        </div>
      )}

      {isBlockModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50  flex justify-center items-center" onClick={handleOutsideClick} >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative" ref={modalRef}>
            <h2 className="text-lg font-bold mb-4">Block User</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to block {selectedUser.Name}?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Block
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}