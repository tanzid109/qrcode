"use client";

import DataTable, { DataRow } from "@/components/table/dataTable";
import React, { useState, useRef } from "react";

interface IUserEvent {
  icon: string;
  onClick: () => void;
}

interface IVenueTable extends DataRow {
  "Serial ID": string;
  "Venue Name": string;
  "Venue Type": string;
  "Location": string;
  "Menu Items": number;  action: {
    events: IUserEvent[];
  };
}

export default function AllVenues() {
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State for view modal
  const [selectedVenue, setSelectedVenue] = useState<IVenueTable | null>(null);
  const blockModalRef = useRef<HTMLDivElement | null>(null);
  const viewModalRef = useRef<HTMLDivElement | null>(null);

  const handleBlockClick = (venue: IVenueTable) => {
    setSelectedVenue(venue);
    setIsBlockModalOpen(true);
  };

  const handleViewClick = (venue: IVenueTable) => {
    setSelectedVenue(venue);
    setIsViewModalOpen(true);
  };

  const closeBlockModal = () => {
    setIsBlockModalOpen(false);
    setSelectedVenue(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedVenue(null);
  };

  const handleOutsideClick = (event: React.MouseEvent, modalType: 'block' | 'view') => {
    const modalRef = modalType === 'block' ? blockModalRef : viewModalRef;
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      modalType === 'block' ? closeBlockModal() : closeViewModal();
    }
  };

  const allVenueTableData: IVenueTable[] = Array.from({ length: 60 }, (_, i) => ({
    "Serial ID": `${1223 + i}`,
    "Venue Name": "Banquet Hall",
    "Venue Type": "Restaurant",
    "Location": "Banashree, Dhaka",
    "Menu Items": 16,
    action: {
      events: [
        {
          icon: "/assets/icons/edit.svg",
          onClick: () => {
            console.log("Edit clicked for Banquet Hall");
          },
        },
        {
          icon: "/assets/icons/eye.svg",
          onClick: () => handleViewClick({
            "Serial ID": `${1223 + i}`,
            "Venue Name": "Banquet Hall",
            "Venue Type": "Restaurant",
            "Location": "Banashree, Dhaka",
            "Menu Items": 16,
            action: { events: [] },
          }),
        },
        {
          icon: "/assets/icons/block.svg",
          onClick: () => handleBlockClick({
            "Serial ID": `${1223 + i}`,
            "Venue Name": "Banquet Hall",
            "Venue Type": "Restaurant",
            "Location": "Banashree, Dhaka",
            "Menu Items": 16,
            action: { events: [] },
          }),
        },
      ],
    },
  }));

  // Define column configurations for the DataTable
  const columns = [
    { key: "Serial ID", label: "Serial ID" },
    {
      key: "Venue Name",
      label: "Venue Name",
    },
    { key: "Venue Type", label: "Venue Type" },
    { key: "Location", label: "Location" },
    { key: "Menu Items", label: "Menu Items" },
    { key: "action", label: "Actions" },
  ];

  return (
    <main>
      <section className="rounded-xl shadow-2xl p-6">
        <DataTable data={allVenueTableData} />
      </section>

      {isBlockModalOpen && selectedVenue && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center"
          onClick={(e) => handleOutsideClick(e, 'block')}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative"
            ref={blockModalRef}
          >
            <h2 className="text-lg font-bold mb-4">Block Venue</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to block{" "}
              <span className="font-semibold">{selectedVenue["Venue Name"]}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeBlockModal}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={closeBlockModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Block
              </button>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && selectedVenue && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center"
          onClick={(e) => handleOutsideClick(e, 'view')}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
            ref={viewModalRef}
          >
            <h2 className="text-lg font-bold mb-4">Venue Details</h2>
            <div className="space-y-2">
              <p><span className="font-semibold">Serial ID:</span> {selectedVenue["Serial ID"]}</p>
              <p><span className="font-semibold">Venue Type:</span> {selectedVenue["Venue Type"]}</p>
              <p><span className="font-semibold">Location:</span> {selectedVenue["Location"]}</p>
              <p><span className="font-semibold">Menu Items:</span> {selectedVenue["Menu Items"]}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}