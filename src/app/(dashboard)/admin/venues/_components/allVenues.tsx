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
  Location: string;
  "Menu Items": number;
  action: {
    events: IUserEvent[];
  };
}

export default function AllVenues() {
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<IVenueTable | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleBlockClick = (venue: IVenueTable) => {
    setSelectedVenue(venue);
    setIsBlockModalOpen(true);
  };

  const closeModal = () => {
    setIsBlockModalOpen(false);
    setSelectedVenue(null);
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  const allVenueTableData: IVenueTable[] = Array.from({ length: 60}, (_, i) => ({
    "Serial ID": `${1223 + i}`,
    "Venue Name": "Banquet Hall",
    "Venue Type": "Restaurant",
    Location: "Banashree, Dhaka",
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
          onClick: () => {
            console.log("View clicked for Banquet Hall");
          },
        },
        {
          icon: "/assets/icons/block.svg",
          onClick: () =>
            handleBlockClick({
              "Serial ID": `${1223 + i}`,
              "Venue Name": "Banquet Hall",
              "Venue Type": "Restaurant",
              Location: "Banashree, Dhaka",
              "Menu Items": 16,
              action: { events: [] },
            }),
        },
      ],
    },
  }));

  return (
    <main>
      <section className="rounded-xl shadow-2xl">
        <DataTable data={allVenueTableData} />
      </section>

      {isBlockModalOpen && selectedVenue && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center"
          onClick={handleOutsideClick}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative"
            ref={modalRef}
          >
            <h2 className="text-lg font-bold mb-4">Block Venue</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to block{" "}
              <span className="font-semibold">{selectedVenue["Venue Name"]}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Block
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
