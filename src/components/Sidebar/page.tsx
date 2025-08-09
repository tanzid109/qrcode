import React from "react";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <main className="flex flex-col w-[250px] px-auto gap-10 pt-[30px]  shadow-[4px_0px_8px_rgba(0,0,0,0.1)] min-h-screen">
      <Image src="/assets/icons/logo.svg" alt="logo" height={75} width={250} />
      {sidebarData.map((section, ind) => (
        <section key={ind} className="gap-[10px] p-4">
          <h2 className="font-bold text-xs leading-5 px-4">
            {section.section}
          </h2>
          <ul className="space-y-2">
            {section.value.map((item) =>
              "sub" in item ? (
                <li key={item.title}>
                  <div className="flex items-center px-4 py-2 gap-3 font-medium text-base leading-5 rounded-[6px] hover:bg-[#FF6F61] hover:text-[#ffffff]">
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
                <li key={item.title} className="">
                  <Link
                    href={item.path}
                    className="flex items-center px-4 py-2 gap-3 font-medium text-base leading-5 rounded-[6px] hover:bg-[#FF6F61] hover:text-[#ffffff]"
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
