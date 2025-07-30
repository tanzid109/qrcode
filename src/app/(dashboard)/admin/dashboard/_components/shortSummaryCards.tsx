import Image from "next/image";
import React from "react";

const SummaryData = [
  {
    title: "Total Users",
    value: 3500,
    icon: "/assets/icons/totalUser.svg",
  },
  {
    title: "Total Venues",
    value: 3500,
    icon: "/assets/icons/totalVenue.svg",
  },
  {
    title: "Total Earnings",
    value: "£25,000",
    icon: "/assets/icons/totalEarning.svg",
  },
];

export default function ShortSummaryCards() {
  return (
    <main className="flex justify-between w-full shrink-0">
      {SummaryData.map((data, ind) => (
        <section
          key={ind}
          className="flex justify-center gap-5 items-center w-[245px] h-[122px] p-4 rounded-[14px] border-2 border-[#FF6F61]"
        >
          <Image src={data.icon} alt={data.title} width={64} height={64} />
          <div className=" space-y-[5px] text-[#FF6F61]">
            <h1 className="font-bold text-center text-2xl leading-[130%]">
              {data.value}
            </h1>
            <p className="font-medium text-center text-base leading-[120%]">
              {data.title}
            </p>
          </div>
        </section>
      ))}
    </main>
  );
}
