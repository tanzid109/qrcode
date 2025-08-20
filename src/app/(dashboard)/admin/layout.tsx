import React from "react";
import Headbar from "../../../components/Headbar/page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="space-y-[22px]">
      <section className="sticky top-0 z-50 p-3 bg-transparent rounded-sm shadow-sm backdrop-blur-sm">
        <Headbar />
      </section>  
      {children}
    </main>
  );
}
