"use client";

import DataTable from "@/components/table/dataTable";
import React from "react";

interface IUserEvent {
  icon: string;
  onClick: () => void;
}

interface IUserTable {
  id: string;
  name: string;
  email: string;
  joiningDate: Date;
  gitftSent: number;
  giftReceived: number;
  action: {
    events: IUserEvent[];
  };
}

const recentUserTableData: IUserTable[] = [
  {
    id: "1223",
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
      ],
    },
  },
];

export default function RecentUser() {
  return (
    <main>
      <DataTable data={recentUserTableData} />
    </main>
  );
}
