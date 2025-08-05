"use client";

import DataTable, { DataRow } from "@/components/table/dataTable";
import React from "react";

interface IUserEvent {
  icon: string;
  onClick: () => void;
}

interface IUserTable extends DataRow {
  "Serial ID": string;
  name: string;
  email: string;
  joiningDate: Date;
  gitftSent: number;
  giftReceived: number;
  action: {
    events: IUserEvent[];
  };
}

const recentUserTableData: IUserTable[] = Array.from({ length: 5 }, (_, i) => ({
  "Serial ID": `${1223 + i}`,
  name: "John Doe",
  email: "example@gmail.com",
  joiningDate: new Date("jun 10, 2025"),
  gitftSent: 16,
  giftReceived: 16,
  action: {
    events: [
      {
        icon: "/assets/icons/block.svg",
        onClick: () => {
          console.log("Block clicked for John Doe");
        },
      },
      {
        icon: "/assets/icons/eye.svg",
        onClick: () => {
          console.log("Block clicked for John Doe");
        },
      },
    ],
  },
}));

export default function RecentUser() {
  return (
    <main className="">
      <section className="rounded-xl shadow-2xl">
        <DataTable data={recentUserTableData} />
      </section>
    </main>
  );
}
