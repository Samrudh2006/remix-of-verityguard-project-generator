"use client";

import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { TrophyIcon, FireIcon, StarIcon } from "@heroicons/react/24/solid";

const mockLeaderboard = [
  { rank: 1, name: "Alex Johnson", points: 15420, badges: 12, streak: 45 },
  { rank: 2, name: "Maria Garcia", points: 14850, badges: 10, streak: 38 },
  { rank: 3, name: "Chen Wei", points: 13920, badges: 11, streak: 42 },
  { rank: 4, name: "Sarah Ahmed", points: 12450, badges: 9, streak: 30 },
  { rank: 5, name: "John Smith", points: 11890, badges: 8, streak: 28 },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Leaderboard
        </h1>

        <div className="space-y-4">
          {mockLeaderboard.map((user, index) => (
            <AnimatedCard key={user.rank} delay={index * 0.1}>
              <div className="p-6 flex items-center gap-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 font-bold text-xl">
                  {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : user.rank}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">{user.name}</h3>
                  <div className="flex items-center gap-6 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span>{user.points.toLocaleString()} points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrophyIcon className="w-4 h-4 text-purple-400" />
                      <span>{user.badges} badges</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FireIcon className="w-4 h-4 text-orange-400" />
                      <span>{user.streak} day streak</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
}
