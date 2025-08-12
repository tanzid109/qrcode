"use client";

import React, { useState } from "react";
import { Eye, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface IEarningRow {
  serialId: string;
  venue: string;
  totalEarnings: number;
  commission: number;
  payableAmount: number;
  status: "Pending" | "Paid";
}

const formatCurrency = (amount: number) =>
  `£${Math.abs(amount).toFixed(2)}`;

const columns = [
  "Serial ID",
  "Venue",
  "Total Earnings",
  "Commission (20%)",
  "Payable amount",
  "Status",
  "Transactions",
  "Action",
];

const baseRow: IEarningRow = {
  serialId: "1223",
  venue: "The Cafe Rio",
  totalEarnings: 2450,
  commission: 2450,
  payableAmount: 2450,
  status: "Paid",
};

// Generate 100 rows for demo
const earningsTableData: IEarningRow[] = Array.from({ length: 100 }, (_, i) => ({
  ...baseRow,
  status: i % 2 === 0 ? "Pending" : "Paid",
  commission: i === 0 ? -490 : 2450,
  payableAmount: i === 0 ? 1960 : 2450,
}));

export default function VenuesWallet() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(earningsTableData.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = earningsTableData.slice(startIndex, startIndex + rowsPerPage);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <main className="">
      <section className="rounded-xl shadow-2xl overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead className=" leading-[24px] px-6 py-8 capitalize text-center text-lg text-[#2C2C2C] font-extrabold  border-b border-[#E1E1E1]">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-6 py-8 font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, i) => (
              <tr key={i} className="border-b border-[#E1E1E1] text-center">
                <td className="text-base text-[#2C2C2C] leading-[24px] px-6 py-8">{row.serialId}</td>
                <td className="text-base text-[#2C2C2C] leading-[24px] px-6 py-8">{row.venue}</td>
                <td className="text-base text-[#2C2C2C] leading-[24px] px-6 py-8 font-semibold">
                  {formatCurrency(row.totalEarnings)}
                </td>
                <td className="text-base text-[#2C2C2C] leading-[24px] px-6 py-8 font-semibold">
                  {row.commission < 0
                    ? `-${formatCurrency(row.commission)}`
                    : formatCurrency(row.commission)}
                </td>
                <td className="text-base text-[#2C2C2C] leading-[24px] px-6 py-8 font-semibold">
                  {formatCurrency(row.payableAmount)}
                </td>
                <td className="text-base text-[#2C2C2C] leading-[24px] px-6 py-8">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 w-fit ${row.status === "Pending"
                        ? "bg-[#FFD064] text-[#3C3C3C]"
                        : "bg-[#16A249] text-white"
                      }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="text-base text-[#2C2C2C] leading-[24px] px-6 py-8">
                  <button className="flex items-center gap-1 bg-[#FFCCC7] text-[#2C2C2C] font-semibold px-4 py-2 rounded">
                    <Eye size={24} />
                    See Transactions
                  </button>
                </td>
                <td className="text-base text-[#2C2C2C] leading-[24px] px-6 py-8">
                  <button className="flex items-center gap-1 border border-red-500 text-red-500 px-3 py-1 rounded">
                    <CheckCircle size={16} />
                    Mark as paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-1 p-4 border-t border-[#E1E1E1] ">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1 border rounded disabled:opacity-50"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        {getPaginationNumbers().map((num, idx) =>
          num === "..." ? (
            <span key={idx} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => changePage(Number(num))}
              className={`px-3 py-1 border rounded ${currentPage === num
                ? "bg-red-500 text-white border-red-500"
                : ""
                }`}
            >
              {num}
            </button>
          )
        )}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1 border rounded disabled:opacity-50"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </main>
  );
}
