"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

export default function RecentActivity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sample notifications data to match the component's structure
  const notifications = Array.from({ length: 15 }, (_, ind) => ({
    id: ind,
    message: "You added a Venue successfully.",
    time: "2:00 PM",
  }));

  // Handle modal open
  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  // Handle click outside modal to close it
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  return (
    <main className="pb-10 rounded-[14px] space-y-5 h-full overflow-auto scroll-auto">
      <section className="sticky top-0 z-40 bg-gray-100 py-4 px-6 flex justify-between w-full">
        <h1 className="text-lg leading-6 font-bold">Recent Activity</h1>
        <button
          className="text-xs leading-5 font-regular text-[#FF6F61]"
          onClick={handleViewAllClick}
        >
          View all
        </button>
      </section>
      <section className="space-y-3 px-5 h-full">
        {Array.from({ length: 50 }, (_, ind) => (
          <div key={ind} className="flex gap-[10px] items-center h-10">
            <Image
              src="/assets/icons/notificationBold.svg"
              alt="notification"
              width={28}
              height={28}
            />
            <div className="space-y-2">
              <h1 className="text-base font-semibold leading-5">
                You added a Venue successfully.
              </h1>
              <h1 className="text-[10px] font-regular leading-[14px] text-[#FF6F61]">
                2:00 PM
              </h1>
            </div>
          </div>
        ))}
      </section>

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
            <div className="p-5">
              <div className="border-b border-[#FF6F61] pb-4 mb-4">
                <h2 className="text-2xl font-bold text-[#FF6F61] text-center">
                  Notifications
                </h2>
              </div>
              <div>
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-center gap-4 mb-4">
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
                ))}
              </div>
            </div>
            <div className="mx-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white bg-[#FF6F61] w-full p-3 rounded-2xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}