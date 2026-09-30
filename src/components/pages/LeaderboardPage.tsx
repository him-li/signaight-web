"use client";
import LeaderboardDash from "../blocks/LeaderboardDash";
import LeaderboardTable from "../blocks/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <div
      className="flex flex-col w-full min-h-full justify-between py-10 gap-10"
      id="#/properties/campaigns-leaderboard"
    >
      <div className="px-16">
        <LeaderboardDash />
      </div>
      <div className="px-16 h-full min-h-max">
        <LeaderboardTable />
      </div>
    </div>
  );
}
