"use client";
import { useState } from "react";
import { VenuesWallet } from "./_components/venuesWallet";

export default function Page() {
  const [commissionRate, setCommissionRate] = useState(10);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCommissionClick = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setCommissionRate(value);
      setInputValue(""); // Clear input after setting
    } else {
      alert("Please enter a valid commission rate between 0 and 100");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommissionClick();
    }
  };

  return (
    <main className="">
      <section className="space-y-[20px]">
        <section className="flex justify-between items-center">
          <h1 className="font-bold text-[#1D242D] text-[40px] leading-[110%]">
            Venues Wallet
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="commission" className="font-semibold text-xl text-[#3C3C3C]">
                Change Commission Rate:
              </label>
              <div className="relative">
                <input
                  id="commission"
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={`${commissionRate}%`}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFD064] focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3C3C3C] font-semibold">
                  %
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCommissionClick}
              className="bg-[#FFD064] text-[#3C3C3C] px-4 py-2 rounded-xl font-semibold hover:bg-[#e6bb57] transition-colors"
            >
              Set Commission
            </button>
          </div>
        </section>
        <VenuesWallet commissionRate={commissionRate} />
      </section>
    </main>
  );
}