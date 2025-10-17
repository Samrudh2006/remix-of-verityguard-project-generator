"use client";

import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { ChartBarIcon, UserGroupIcon, DocumentTextIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function AdminPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: UserGroupIcon, label: "Total Users", value: "12,458", color: "from-purple-500 to-blue-500" },
            { icon: DocumentTextIcon, label: "Articles Verified", value: "3,892", color: "from-blue-500 to-cyan-500" },
            { icon: ShieldCheckIcon, label: "Trust Score Avg", value: "87%", color: "from-cyan-500 to-teal-500" },
            { icon: ChartBarIcon, label: "Active Today", value: "1,247", color: "from-teal-500 to-green-500" },
          ].map((stat, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <div className="p-6">
                <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatedCard delay={0.4}>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  "New article verified: Climate Study",
                  "User reported suspicious claim",
                  "Trust score updated for 5 articles",
                  "New badge awarded to top contributors",
                ].map((activity, i) => (
                  <div key={i} className="text-white/70 text-sm py-2 border-b border-white/10">
                    {activity}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.5}>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Trending Claims</h3>
              <div className="space-y-3">
                {[
                  { claim: "Climate change acceleration", count: 245 },
                  { claim: "Quantum computing breakthrough", count: 189 },
                  { claim: "New vaccine efficacy data", count: 167 },
                  { claim: "AI language model capabilities", count: 143 },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70 text-sm">{item.claim}</span>
                    <span className="text-purple-400 font-semibold">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
