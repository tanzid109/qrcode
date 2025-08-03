"use client";

import Image from "next/image";
import React from "react";

interface IUserEvent {
  icon: string;
  onClick: () => void;
}

type DataRow = {
  id: string;
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
          <div className="flex gap-2 justify-center">
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
      <table className="min-w-full table-auto text-center border-collapse">
        <thead>
          <tr>
            {tableHeader.map((key) => (
              <th key={key} className="px-4 py-2 capitalize text-left border-b">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b">
              {tableHeader.map((key) => (
                <td key={key} className="px-4 py-2 text-left">
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
