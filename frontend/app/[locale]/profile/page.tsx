"use client";

import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { UserCircleIcon, TrophyIcon, FireIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnimatedCard className="lg:col-span-1">
            <div className="p-6 text-center">
              <UserCircleIcon className="w-32 h-32 mx-auto text-white/50 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">John Doe</h2>
              <p className="text-white/70 mb-4">Fact Checker Extraordinaire</p>
              <div className="flex justify-center gap-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                  Level 12
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  Pro Member
                </span>
              </div>
            </div>
          </AnimatedCard>

          <div className="lg:col-span-2 space-y-6">
            <AnimatedCard delay={0.1}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <TrophyIcon className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">2,450</div>
                      <div className="text-sm text-white/60">Total Points</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FireIcon className="w-8 h-8 text-orange-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">15</div>
                      <div className="text-sm text-white/60">Day Streak</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ChartBarIcon className="w-8 h-8 text-cyan-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">127</div>
                      <div className="text-sm text-white/60">Verifications</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrophyIcon className="w-8 h-8 text-yellow-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">8</div>
                      <div className="text-sm text-white/60">Badges Earned</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Badges</h3>
                <div className="flex gap-4">
                  {["🏆", "⭐", "🔥", "💎", "👑"].map((badge, i) => (
                    <div key={i} className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-3xl">
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
}
