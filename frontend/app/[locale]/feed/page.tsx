"use client";

import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

const mockArticles = [
  {
    id: 1,
    title: "Breaking: New Climate Study Released",
    claim: "Global temperatures rising faster than predicted",
    source: "Science Daily",
    trustScore: 92,
    status: "verified",
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "Tech Innovation Announcement",
    claim: "Quantum computer breakthrough achieved",
    source: "Tech News",
    trustScore: 78,
    status: "pending",
    date: "5 hours ago",
  },
  {
    id: 3,
    title: "Health Study Results",
    claim: "New vaccine shows 95% efficacy",
    source: "Medical Journal",
    trustScore: 88,
    status: "verified",
    date: "1 day ago",
  },
];

export default function FeedPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Latest Fact Checks
        </h1>

        <div className="space-y-6">
          {mockArticles.map((article, index) => (
            <AnimatedCard key={article.id} delay={index * 0.1}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {article.status === "verified" ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                      ) : article.status === "pending" ? (
                        <ClockIcon className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <XCircleIcon className="w-5 h-5 text-red-400" />
                      )}
                      <span className="text-sm text-white/60">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {article.title}
                    </h3>
                    <p className="text-white/70 mb-3">{article.claim}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-white/60">Source: {article.source}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white/60">Trust Score:</span>
                        <div className="relative w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${article.trustScore}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-cyan-500"
                          />
                        </div>
                        <span className="text-white font-semibold">{article.trustScore}%</span>
                      </div>
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
