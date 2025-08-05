"use client";

import Image from "next/image";
import React from "react";

interface IUserEvent {
  icon: string;
  onClick: () => void;
}

export type DataRow = {
  [key: string]: unknown;
};

export default function DataTable<T extends DataRow>({ data }: { data: T[] }) {
  if (!data || data.length === 0) return <p>No data available</p>;

  const tableHeader = Object.keys(data[0]);

  const renderCell = (value: unknown) => {
    if (value instanceof Date) return value.toDateString();

    if (typeof value === "object" && value !== null) {
      if ("events" in value && Array.isArray(value.events)) {
        return (
          <div className="flex gap-[10px] justify-center">
            {value.events.map((event: IUserEvent, index: number) => (
              <div
                key={index}
                onClick={event.onClick}
                className="p-1 cursor-pointer rounded-full hover:bg-gray-200 flex items-center justify-center"
              >
                <Image src={event.icon} alt="icon" height={24} width={24} />
              </div>
            ))}
          </div>
        );
      }

      return JSON.stringify(value);
    }

    return value?.toString();
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full table-auto  border-[#E1E1E1]">
        <thead>
          <tr>
            {tableHeader.map((key) => (
              <th
                key={key}
                className="px-6 py-8 capitalize text-center text-lg text-[#2C2C2C] font-extrabold leading-[28px]  border-b-[1px] border-[#E1E1E1]"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ind) => (
            <tr
              key={ind}
              className="border-b-[1px] border-[#E1E1E1] text-center"
            >
              {tableHeader.map((key) => (
                <td
                  key={key}
                  className={`${
                    key === "Serial Id" ? "font-medium" : "font-bold"
                  } "text-base text-[#2C2C2C]  leading-[24px] border-b-[1px] border-[#E1E1E1] px-6 py-8 "`}
                >
                  {renderCell(row[key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
