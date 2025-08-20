"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";

export default function Headbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const notifications = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    message: `You added a Venue successfully. #${i + 1}`,
    time: "2:00 AM",
  }));

  const handleNotificationClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowAll(false); // reset when closed
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  return (
    <>
      <header className="flex justify-end items-center gap-[30px]">
        <Image
          src="/assets/icons/notification.svg"
          alt="profile"
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          onClick={handleNotificationClick}
        />
        <section className="flex gap-[14px] items-center">
          <div className="text-right">
            <h1 className="text-sm font-bold leading-[22px]">James Mitchell</h1>
            <h1 className="text-[10px] leading-[14px]">Admin</h1>
          </div>
          <Image
            src="/assets/icons/totalVenue.svg"
            alt="profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </section>
      </header>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center"
          onClick={handleOutsideClick}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div
            className="bg-white w-2/5 rounded-lg shadow-lg p-6 relative max-h-[80vh] overflow-y-auto"
            ref={modalRef}
          >
            <div className= "p-5">
              <div className="border-b border-[#FF6F61] pb-4 mb-4">
                <h2 className="text-2xl font-bold text-[#FF6F61] text-center">
                  Notifications
                </h2>
              </div>
              <div>
                {(showAll ? notifications : notifications.slice(0, 3)).map(
                  (notif) => (
                    <div
                      key={notif.id}
                      className="flex items-center gap-4 mb-4"
                    >
                      <div>
                        <Image
                          src="/assets/icons/notification.svg"
                          alt="profile"
                          width={30}
                          height={30}
                          className="rounded-full cursor-pointer"
                        />
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          {notif.message}
                        </p>
                        <p className="text-sm text-[#FF6F61]">{notif.time}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className=" mx-auto">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="text-white bg-[#FF6F61] w-full p-3 rounded-2xl"
              >
                {showAll ? "Show Less" : "See All"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
