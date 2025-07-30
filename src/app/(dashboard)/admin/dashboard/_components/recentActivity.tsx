import React from "react";
import Image from "next/image";

export default function RecentActivity() {
  return (
    <main className="p-8 pb-10 rounded-[14px] space-y-5 h-full  overflow-auto ">
      <section className="flex justify-between w-full">
        <h1 className="text-lg leading-6 font-bold">Recent Activity</h1>
        <button className="text-xs leading-5 font-regular text-[#FF6F61]">
          View all
        </button>
      </section>
      <section className="space-y-3  h-full ">
        {Array.from({ length: 15 }, (_, ind) => (
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
    </main>
  );
}
