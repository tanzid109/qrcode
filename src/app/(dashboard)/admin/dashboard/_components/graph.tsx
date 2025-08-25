"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "",
      data: [500, 700, 650, 800, 500, 625, 475, 650, 800, 600, 450, 750],
      borderColor: "#FF6F61",
      backgroundColor: "#FF6F61",
      borderWidth: 5,
      tension: 0.3,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 8,
    },
    {
      label: "",
      data: [800, 950, 850, 700, 600, 750, 825, 775, 975, 900, 700, 875],
      borderColor: "#B4B8BD",
      backgroundColor: "#B4B8BD",
      borderWidth: 5,
      tension: 0.3,
      fill: false,
      pointRadius: 0,
      pointHoverRadius: 8,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#ffffff",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      titleColor: "#9ca3af",
      bodyColor: "#111827",
      titleAlign: "center" as const,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      usePointStyle: true,
      callbacks: {
        title: (tooltipItems: TooltipItem<'line'>[]) => {
          // Example date mapping
          const month = tooltipItems[0].label;
          return `${month} 14, 2030`; // Replace with real date mapping if needed
        },
        label: (tooltipItem: TooltipItem<'line'>) => {
          const value = tooltipItem.formattedValue;
          return ` ${value}`;
        },
        labelTextColor: (tooltipItem: TooltipItem<'line'>) => {
          return tooltipItem.dataset.borderColor as string;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
      },
    },
    y: {
      beginAtZero: true,
      max: 1000,
      ticks: {
        stepSize: 250,
      },
      grid: {
        drawBorder: false,
        drawTicks: false,
      },
    },
  },
};

export default function Graph() {
  return (
    <div className="bg-white p-4 rounded-[14px] space-y-5 w-full shadow-2xl/10 flex-grow h-[356px]">
      <div className="flex items-center gap-5 mb-4">
        <h2 className="text-lg font-bold leading-[150%]">Users–Venues ratio</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FF6F61] inline-block"></span>
            <span className="text-sm font-medium leading-5">Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#B4B8BD] inline-block"></span>
            <span className="text-sm font-medium leading-5">Venues</span>
          </div>
        </div>
      </div>
      <div className="h-[300px] py-4">
        <Line data={data} options={options} className="w-full" />
      </div>
    </div>
  );
}