"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // for active link detection

const sidebarData = [
  {
    section: "Menu",
    value: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: "/assets/icons/dashboard.svg",
      },
      { title: "Users", path: "/admin/users", icon: "/assets/icons/user.svg" },
      {
        title: "Venues",
        path: "/admin/venues",
        icon: "/assets/icons/venue.svg",
      },
      {
        title: "Venue Wallet",
        path: "/admin/venue-wallet",
        icon: "/assets/icons/wallet.svg",
      },
      {
        title: "Earnings",
        path: "/admin/earnings",
        icon: "/assets/icons/earnings.svg",
      },
    ],
  },
  {
    section: "Other",
    value: [
      {
        title: "Profile",
        path: "/admin/profile",
        icon: "/assets/icons/profile.svg",
      },
      {
        title: "Settings",
        sub: [
          {
            title: "Change Password",
            path: "/admin/change-password",
            icon: "",
          },
          {
            title: "Privacy Policy",
            path: "/admin/privacy-policy",
            icon: "",
          },
          {
            title: "Terms & Condition",
            path: "/admin/terms-and-condition",
            icon: "",
          },
          {
            title: "Help & Support",
            path: "/admin/help-and-support",
            icon: "",
          },
        ],
        icon: "/assets/icons/settings.svg",
      },
      {
        title: "Log out",
        path: "/login",
        icon: "/assets/icons/logout.svg",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname(); // get current path
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <main className="fixed flex flex-col px-auto gap-10 pt-[30px] shadow-[4px_0px_8px_rgba(0,0,0,0.1)] min-h-screen">
      <Image src="/assets/icons/logo.svg" alt="logo" height={75} width={250} />

      {sidebarData.map((section, ind) => (
        <section key={ind} className="gap-[10px] p-4">
          <h2 className="font-bold text-xs leading-5 px-4">{section.section}</h2>
          <ul className="space-y-2">
            {section.value.map((item) =>
              "sub" in item ? (
                <li key={item.title}>
                  {/* Settings button - clickable to toggle submenu */}
                  <button
                    type="button"
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className={`flex items-center w-full px-4 py-2 gap-3 font-medium text-base leading-5 rounded-[6px] hover:bg-[#FF6F61] hover:text-white focus:outline-none`}
                    aria-expanded={settingsOpen}
                    aria-controls="settings-submenu"
                  >
                    <Image src={item.icon} alt={item.title} width={18} height={18} />
                    <span>{item.title}</span>
                    <svg
                      className={`ml-auto h-4 w-4 transition-transform duration-200 ${settingsOpen ? "rotate-90" : "rotate-0"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Submenu: only visible if settingsOpen is true */}
                  {settingsOpen && (
                    <ul
                      id="settings-submenu"
                      className="mt-1 space-y-1 text-sm text-gray-600 pl-8"
                      role="menu"
                      aria-label="Settings submenu"
                    >
                      {item.sub?.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.path}
                            className={`flex items-center text-base hover:text-black ${pathname === subItem.path ? "text-[#FF6F61] font-semibold" : ""}`}
                            role="menuitem"
                          >
                            <p className="mr-1">•</p>
                            <p>{subItem.title}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className={`flex items-center px-4 py-2 gap-3 font-medium text-base leading-5 rounded-[6px] hover:bg-[#FF6F61] hover:text-white ${pathname === item.path ? "bg-[#FF6F61] text-white" : ""}`}
                  >
                    <Image src={item.icon} alt={item.title} width={18} height={18} />
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </section>
      ))}
    </main>
  );
}