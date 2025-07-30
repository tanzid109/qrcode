import Sidebar from "@/components/Sidebar/page";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex ">
      <Sidebar />
      <section className="px-[25px] pt-[22px] pb-6 flex-grow">
        {children}
      </section>
    </main>
  );
}
