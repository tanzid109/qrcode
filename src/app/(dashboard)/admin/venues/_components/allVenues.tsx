"use client";

import DataTable, { DataRow } from "@/components/table/dataTable";
import React from "react";

interface IUserEvent {
  icon: string;
  onClick: () => void;
}

interface IVenueTable extends DataRow {
  "Serial ID": string;
  "Venue Name": string;
  "Venue Type": string;
  Location: string;
  "Menu Items": number;
  action: {
    events: IUserEvent[];
  };
}

const allVenueTableData: IVenueTable[] = Array.from({ length: 10 }, (_, i) => ({
  "Serial ID": `${1223 + i}`,
  "Venue Name": "John Doe",
  "Venue Type": "example@gmail.com",
  Location: "Banashree, Dhaka",
  "Menu Items": 16,
  action: {
    events: [
      {
        icon: "/assets/icons/edit.svg",
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
      {
        icon: "/assets/icons/block.svg",
        onClick: () => {
          console.log("Block clicked for John Doe");
        },
      },
    ],
  },
}));

export default function AllVenues() {
  return (
    <main className="">
      <section className="rounded-xl shadow-2xl">
        <DataTable data={allVenueTableData} />
      </section>
    </main>
  );
}
