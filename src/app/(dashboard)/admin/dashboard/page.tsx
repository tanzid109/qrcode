import React from "react";
import ShortSummaryCards from "./_components/shortSummaryCards";
import Graph from "./_components/graph";
import RecentActivity from "./_components/recentActivity";
import RecentUser from './_components/recentUser';

export default function DashboardPage() {
  return (
    <main className="space-y-[15px]">
      <section className="flex gap-10 h-[500px]">
        <section className="flex flex-col space-y-[22px] w-[55%] ">
          <ShortSummaryCards />
          <Graph />
        </section>
        <section className="flex-grow shadow-2xl/10 w-[35%] ">
          <RecentActivity />
        </section>
      </section>
      <section className="">
        <RecentUser/>
      </section>
    </main>
  );
}
