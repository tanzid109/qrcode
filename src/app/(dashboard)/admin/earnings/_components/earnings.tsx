"use client";

import DataTable, { DataRow } from "@/components/table/dataTable";
import React from "react";

interface IEvent {
  icon: string;
  onClick: () => void;
}

interface IEarningTable extends DataRow {
  "Serial ID": string;
  "Venue Name": string;
  "Commission Earning": string;
  "Transaction ID": string;
  Date: Date;
  action: {
    events: IEvent[];
  };
}

const earningsTableData: IEarningTable[] = Array.from(
  { length: 60 },
  (_, i) => ({
    "Serial ID": `${1223 + i}`,
    "Venue Name": "The Cafe Rio",
    "Commission Earning": "$550.50",
    "Transaction ID": "TNX12094546",
    Date: new Date("jun 10, 2025"),
    action: {
      events: [
        {
          icon: "/assets/icons/delete.svg",
          onClick: () => {
            console.log("Block clicked for John Doe");
          },
        },
      ],
    },
  })
);

export default function Earnings() {
  return (
    <main className="">
      <section className="rounded-xl shadow-2xl">
        <DataTable data={earningsTableData} />
      </section>
    </main>
  );
}
