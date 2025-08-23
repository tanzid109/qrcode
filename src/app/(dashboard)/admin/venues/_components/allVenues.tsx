"use client";

import DataTable, { DataRow } from "@/components/table/dataTable";
import React, { useState, useRef } from "react";
import EditVenue from "./EditVenue"; // import modal

interface IUserEvent {
  icon: string;
  onClick: () => void;
}

interface VenueNameData {
  name: string;
  image: string;
}

interface IVenueTable extends DataRow {
  "Serial ID": string;
  "Venue Name": VenueNameData;
  "Venue Type": string;
  "Location": string;
  "Menu Items": number;
  action: {
    events: IUserEvent[];
  };
}

export default function AllVenues() {
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State for view modal
  const [selectedVenue, setSelectedVenue] = useState<IVenueTable | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

  const handleEditClick = (venue: IVenueTable) => {
    setSelectedVenue(venue);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedVenue(null);
  };

  const handleSaveVenue = (updatedVenue: IVenueTable) => {
    console.log("Updated venue:", updatedVenue);
    // 🔹 Here you can update API or state for allVenueTableData
    setIsEditModalOpen(false);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      modalType === 'block' ? closeBlockModal() : closeViewModal();
    }
  };

  // Sample venue images - you can replace these with actual image URLs
  const venueImages = [
    "/assets/cafe.jpg",
  ];

  const allVenueTableData: IVenueTable[] = Array.from({ length: 60 }, (_, i) => {
    const venue: IVenueTable = {
      "Serial ID": `${1223 + i}`,
      "Venue Name": {
        name: "Banquet Hall",
        image: venueImages[i % venueImages.length], // Cycle through images
      },
      "Venue Type": "Restaurant",
      "Location": "Banashree, Dhaka",
      "Menu Items": 16,
      action: {
        events: [
          {
            icon: "/assets/icons/edit.svg",
            onClick: () => handleEditClick(venue),
          },
          {
            icon: "/assets/icons/eye.svg",
            onClick: () => handleViewClick(venue),
          },
          {
            icon: "/assets/icons/block.svg",
            onClick: () => handleBlockClick(venue),
          },
        ],
      },
    };

    return venue;
  });

  return (
    <main>
      <section className="rounded-xl shadow-2xl p-6">
        <DataTable data={allVenueTableData} />
      </section>

      {isEditModalOpen && selectedVenue && (
        <EditVenue
          venue={selectedVenue}
          onClose={closeEditModal}
          onSave={handleSaveVenue}
        />
      )}

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
              <span className="font-semibold">
                {selectedVenue["Venue Name"].name}
              </span>?
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
              <p><span className="font-semibold">Venue Name:</span> {selectedVenue["Venue Name"].name}</p>
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