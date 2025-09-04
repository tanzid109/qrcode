"use client";

import React, { useState, useMemo } from "react";
import { Eye, CheckCircle, ChevronLeft, ChevronRight, X, Trash2 } from "lucide-react";

interface IEarningRow {
  serialId: string;
  venue: string;
  totalEarnings: number;
  commission: number;
  payableAmount: number;
  status: "Pending" | "Paid";
}

interface ITransaction {
  serialId: string;
  venueName: string;
  paymentFrom: string;
  boughtItem: string;
  paymentAmount: number;
  date: string;
  transactionId: string;
}

const formatCurrency = (amount: number) => `£${Math.abs(amount).toFixed(2)}`;

const columns = [
  "Serial ID",
  "Venue",
  "Total Earnings",
  "Commission",
  "Payable amount",
  "Status",
  "Transactions",
  "Action",
];

const baseRow: IEarningRow = {
  serialId: "1223",
  venue: "The Cafe Rio",
  totalEarnings: 2450,
  commission: 245,
  payableAmount: 2205,
  status: "Paid",
};

// Generate 100 rows for demo
const earningsTableData: IEarningRow[] = Array.from({ length: 100 }, (_, i) => ({
  ...baseRow,
  serialId: `1223-${i + 1}`,
  status: i % 2 === 0 ? "Pending" : "Paid",
  totalEarnings: 2450 + (i * 50), // Vary total earnings
}));

// Generate transaction data for the modal
const generateTransactionData = (serialId: string): ITransaction[] => {
  return Array.from({ length: 6 }, (_, i) => ({
    serialId,
    venueName: "The Cafe Rio",
    paymentFrom: `Customer ${i + 1}`,
    boughtItem: ["Latte", "Espresso", "Cappuccino", "Mocha", "Americano", "Flat White"][i],
    paymentAmount: 10 + i,
    date: `12/${12 + i}/2025`,
    transactionId: `TNX1209454${i + 6}`,
  }));
};

// Modal Component
const TransactionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  row: IEarningRow | null;
}> = ({ isOpen, onClose, row }) => {
  if (!isOpen || !row) return null;

  const transactions = generateTransactionData(row.serialId);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-50 text-black rounded-lg p-4 w-7/12 mx-auto shadow-2xl border border-gray-700 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Transaction Details</h2>
          <button onClick={onClose} className="text-black hover:text-gray-800">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-700">Serial ID</th>
                <th className="px-4 py-2 border-b border-gray-700">Venue Name</th>
                <th className="px-4 py-2 border-b border-gray-700">Payment from</th>
                <th className="px-4 py-2 border-b border-gray-700">Bought Item</th>
                <th className="px-4 py-2 border-b border-gray-700">Payment Amount</th>
                <th className="px-4 py-2 border-b border-gray-700">Date</th>
                <th className="px-4 py-2 border-b border-gray-700">Transaction ID</th>
                <th className="px-4 py-2 border-b border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, i) => (
                <tr key={i} className="border-b border-gray-300">
                  <td className="px-4 py-2">{transaction.serialId}</td>
                  <td className="px-4 py-2">{transaction.venueName}</td>
                  <td className="px-4 py-2">{transaction.paymentFrom}</td>
                  <td className="px-4 py-2">{transaction.boughtItem}</td>
                  <td className="px-4 py-2">{formatCurrency(transaction.paymentAmount)}</td>
                  <td className="px-4 py-2">{transaction.date}</td>
                  <td className="px-4 py-2">{transaction.transactionId}</td>
                  <td className="px-4 py-2 text-center">
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const VenuesWallet: React.FC<{ commissionRate: number }> = ({ commissionRate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IEarningRow | null>(null);
  const [tableData, setTableData] = useState<IEarningRow[]>(earningsTableData);

  // Calculate commission and payable amount based on the dynamic commission rate
  const calculatedTableData = useMemo(() => {
    return tableData.map(row => {
      const commissionAmount = (row.totalEarnings * commissionRate) / 100;
      const payableAmount = row.totalEarnings - commissionAmount;
      return {
        ...row,
        commission: commissionAmount,
        payableAmount: payableAmount,
      };
    });
  }, [tableData, commissionRate]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(calculatedTableData.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = calculatedTableData.slice(startIndex, startIndex + rowsPerPage);

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

  const openModal = (row: IEarningRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleMarkAsPaid = (serialId: string) => {
    setTableData((prev) =>
      prev.map((row) =>
        row.serialId === serialId ? { ...row, status: "Paid" } : row
      )
    );
  };

  return (
    <main className="relative">
      <section className="rounded-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="leading-[24px] px-6 py-8 capitalize text-center text-lg text-[#2C2C2C] font-extrabold border-b border-[#E1E1E1]">
              <tr>
                {columns.map((col, index) => (
                  <th key={col} className="px-6 py-8 font-semibold">
                    {index === 3 ? `${col} (${commissionRate}%)` : col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, i) => (
                <tr key={i} className="border-b border-[#E1E1E1] text-center">
                  <td className="text-base px-6 py-8 font-semibold">{row.serialId}</td>
                  <td className="text-base px-6 py-8 font-semibold">{row.venue}</td>
                  <td className="text-base px-6 py-8 font-semibold">{formatCurrency(row.totalEarnings)}</td>
                  <td className="text-base px-6 py-8 font-semibold">
                    {formatCurrency(row.commission)}
                  </td>
                  <td className="text-base px-6 py-8 font-semibold">{formatCurrency(row.payableAmount)}</td>
                  <td className="text-base px-6 py-8">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-1 w-fit mx-auto ${row.status === "Pending"
                          ? "bg-[#FFD064] text-[#3C3C3C]"
                          : "bg-[#16A249] text-white"
                        }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="text-base px-6 py-8">
                    <button
                      onClick={() => openModal(row)}
                      className="flex items-center gap-1 bg-[#FFCCC7] text-[#2C2C2C] font-semibold px-4 py-2 rounded hover:bg-[#df9b91] transition-colors mx-auto"
                    >
                      <Eye size={24} />
                      See Transactions
                    </button>
                  </td>
                  <td className="text-base px-6 py-8">
                    <button
                      onClick={() => handleMarkAsPaid(row.serialId)}
                      disabled={row.status === "Paid"}
                      className={`flex items-center gap-1 px-3 py-1 rounded transition-colors mx-auto
                        ${row.status === "Paid"
                          ? "bg-red-500 text-white cursor-not-allowed"
                          : "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        }`}
                    >
                      <CheckCircle size={16} />
                      {row.status === "Paid" ? "Paid" : "Mark as paid"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal */}
      <TransactionModal isOpen={isModalOpen} onClose={closeModal} row={selectedRow} />

      {/* Pagination */}
      <div className="flex justify-end items-center gap-1 p-4 border-t border-[#E1E1E1]">
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
              className={`px-3 py-1 border rounded ${currentPage === num ? "bg-red-500 text-white border-red-500" : ""
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
};

// Main Page Component
