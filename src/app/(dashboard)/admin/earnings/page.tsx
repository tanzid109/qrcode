import React from "react";
import Earnings from "./_components/earnings";

export default function page() {
  return (
    <main className="">
      <section className="space-y-[20px]">
        <section className="text-[#1D242D] text-[40px] leading-[110%]  flex justify-between items-center">
          <h1 className="font-bold">Earnings</h1>
        </section>
        <Earnings />
      </section>
    </main>
  );
}
