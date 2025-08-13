import React from "react";
import Headbar from "../../../components/Headbar/page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="space-y-[22px]">
      <section className="sticky top-0 z-50 p-3">
        <Headbar />
      </section>
      {children}
    </main>
  );
}
