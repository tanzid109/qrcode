import React from "react";
import Image from "next/image";
import { icons } from "@/assets/assets.config";
import Link from "next/link";

const sidebarData = [
  {
    section: "Menu",
    value: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "/assets/icons/dashboard.svg",
      },
      { title: "Users", path: "/users", icon: "/assets/icons/user.svg" },
      { title: "Venues", path: "/venues", icon: "/assets/icons/venue.svg" },
      {
        title: "Venue Wallet",
        path: "/venue-wallet",
        icon: "/assets/icons/wallet.svg",
      },
      {
        title: "Earnings",
        path: "/earnings",
        icon: "/assets/icons/earnings.svg",
      },
    ],
  },
  {
    section: "Other",
    value: [
      { title: "Profile", path: "/profile", icon: "/assets/icons/profile.svg" },
      {
        title: "Settings",
        sub: [
          {
            title: "Privacy Policy",
            path: "/privacy-policy",
          },
          { title: "Terms & Condition", path: "/terms-and-condition" },
          { title: "Help & Support", path: "/help-and-support" },
        ],
        icon: "/assets/icons/settings.svg",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <main className="flex flex-col gap-10">
      <Image src="/assets/icons/logo.svg" alt="logo" height={75} width={250} />
      {sidebarData.map((section, ind) => (
        <section key={ind} className="">
          <h2 className="">{section.section}</h2>
          <ul className="">
            {section.value.map((item) =>
              "sub" in item ? (
                <li key={item.title}>
                  <div className="flex items-center gap-2 font-medium text-gray-700">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={18}
                      height={18}
                    />
                    <span>{item.title}</span>
                  </div>
                  <ul className=" mt-1 space-y-1 text-sm text-gray-600">
                    {item.sub &&
                      item.sub.map((subItem) => (
                        <li key={subItem.title} className="">
                          <Link
                            href={subItem.path}
                            className="hover:text-black flex items-center"
                          >
                            <p>.</p>
                            <p>{subItem.title}</p>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ) : (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="flex items-center gap-2 text-gray-700 hover:text-black"
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={18}
                      height={18}
                    />
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
