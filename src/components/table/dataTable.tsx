"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IUserEvent {
  icon: string;
  onClick: () => void;
}

export type DataRow = {
  [key: string]: unknown;
};

export default function DataTable<T extends DataRow>({ data }: { data: T[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // reset to page 1 when data changes
    setCurrentPage(1);
  }, [data]);

  if (!data || data.length === 0) return <p>No data available</p>;

  const tableHeader = useMemo(() => Object.keys(data[0]), [data]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const renderCell = (value: unknown) => {
    if (value instanceof Date) return value.toDateString();

    if (typeof value === "object" && value !== null) {
      // handle events array (icons with handlers)
      if ("events" in (value as any) && Array.isArray((value as any).events)) {
        return (
          <div className="flex gap-[10px] justify-center">
            {(value as any).events.map((event: IUserEvent, index: number) => (
              <div
                key={index}
                onClick={event.onClick}
                className="p-1 cursor-pointer rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <Image src={event.icon} alt="icon" height={24} width={24} />
              </div>
            ))}
          </div>
        );
      }
      return <span className="inline-block">{JSON.stringify(value)}</span>;
    }

    return value?.toString();
  };

  // pagination number generator with ellipsis
  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const pages = getPaginationNumbers();

  return (
    <div className="overflow-auto">
      <table className="min-w-full table-auto border-[#E1E1E1]">
        <thead>
          <tr>
            {tableHeader.map((key) => (
              <th
                key={key}
                className="px-6 py-8 capitalize text-center text-lg text-[#2C2C2C] font-extrabold leading-[28px] border-b-[1px] border-[#E1E1E1]"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentData.map((row, ind) => (
            <tr key={ind} className="border-b-[1px] border-[#E1E1E1] text-center">
              {tableHeader.map((key) => (
                <td
                  key={key}
                  className={`text-base text-[#2C2C2C] leading-[24px] px-6 py-8 ${key.toLowerCase().includes("serial") ? "font-medium" : "font-bold"
                    }`}
                >
                  {renderCell(row[key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination (bottom-right) */}
      <div className="flex justify-end items-center px-4 py-4 border-t border-[#E1E1E1]">
        <nav
          className="inline-flex items-center gap-2"
          role="navigation"
          aria-label="Pagination"
        >
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-2 px-4 py-1 border rounded-md disabled:opacity-50"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
            <span className="whitespace-nowrap">Previous</span>
          </button>

          {/* Page numbers */}
          {pages.map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-3 py-1 text-sm text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setCurrentPage(Number(p))}
                aria-current={currentPage === p ? "page" : undefined}
                className={`px-3 py-1 min-w-[38px] text-sm rounded-md border ${currentPage === p
                    ? "bg-white border-gray-300 text-black shadow-sm"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-2 px-4 py-1 border rounded-md disabled:opacity-50"
            aria-label="Next page"
          >
            <span className="whitespace-nowrap">Next</span>
            <ChevronRight size={16} />
          </button>
        </nav>
      </div>
    </div>
  );
}
