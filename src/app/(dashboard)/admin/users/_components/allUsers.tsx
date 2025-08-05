"use client";

import DataTable, { DataRow } from "@/components/table/dataTable";
import React from "react";

interface IUserEvent {
  icon: string;
  onClick: () => void;
}

interface IUserTable extends DataRow {
  "Serial ID": string;
  Name: string;
  Email: string;
  "Joining Date": Date;
  "Gitft Sent": number;
  "Gift Received": number;
  action: {
    events: IUserEvent[];
  };
}

const allUserTableData: IUserTable[] = Array.from({ length: 10 }, (_, i) => ({
  "Serial ID": `${1223 + i}`,
  Name: "John Doe",
  Email: "example@gmail.com",
  "Joining Date": new Date("jun 10, 2025"),
  "Gitft Sent": 16,
  "Gift Received": 16,
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

export default function AllUser() {
  return (
    <main className="">
      <section className="rounded-xl shadow-2xl">
        <DataTable data={allUserTableData} />
      </section>
    </main>
  );
}
