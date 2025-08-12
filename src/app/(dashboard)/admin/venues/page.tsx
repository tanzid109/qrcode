import React from "react";
import AllVenues from "./_components/allVenues";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <main className="">
      <section className="space-y-[20px]">
        <section className="text-[#1D242D] text-[40px] leading-[110%]  flex justify-between items-center">
          <h1 className="font-bold">All Venues</h1>
          <div className="flex gap-[5px] justify-center bg-[#FF6F61] px-[15px] py-[10px] rounded-sm cursor-pointer">
            <Image
              src="/assets/icons/add.svg"
              alt="add"
              height={30}
              width={30}
            />
            <Link href="/admin/venues/addvenu" className="text-[15px] font-bold leading-[200%] text-[#FFFFFF]">
              Add New Venue
            </Link>
          </div>
        </section>
        <AllVenues />
      </section>
    </main>
  );
}
