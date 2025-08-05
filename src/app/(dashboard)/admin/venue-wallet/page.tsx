import React from "react";
import VenuesWallet from "./_components/venuesWallet";

export default function page() {
  return (
    <main className="">
      <section className="space-y-[20px]">
        <section className="text-[#1D242D] text-[40px] leading-[110%]  flex justify-between items-center">
          <h1 className="font-bold">Venues Wallet</h1>
        </section>
        <VenuesWallet />
      </section>
    </main>
  );
}
