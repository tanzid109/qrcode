"use client";

import DataTable, { DataRow } from "@/components/table/dataTable";
import React, { useState } from "react";

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

export default function Earnings() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IEarningTable | null>(null);

  const handleDeleteClick = (row: IEarningTable) => {
    setSelectedRow(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting row:", selectedRow);
    setShowDeleteModal(false);
    setSelectedRow(null);
    // Here you can also call API to delete the row
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedRow(null);
  };

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
            onClick: () => handleDeleteClick({
              "Serial ID": `${1223 + i}`,
              "Venue Name": "The Cafe Rio",
              "Commission Earning": "$550.50",
              "Transaction ID": "TNX12094546",
              Date: new Date("jun 10, 2025"),
              action: { events: [] } // dummy for type
            }),
          },
        ],
      },
    })
  );

  return (
    <main>
      <section className="rounded-xl shadow-2xl">
        <DataTable data={earningsTableData} />
      </section>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50  flex justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete <strong>{selectedRow?.["Venue Name"]}</strong>?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
