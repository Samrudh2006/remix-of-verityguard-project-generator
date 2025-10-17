"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { CheckCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ArticlePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = use(params);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/feed`}
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Feed
        </Link>

        <AnimatedCard>
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircleIcon className="w-6 h-6 text-green-400" />
              <span className="text-sm text-white/60">Verified - 2 hours ago</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Breaking: New Climate Study Released (Article #{id})
            </h1>

            <div className="flex items-center gap-4 mb-6 text-sm text-white/60">
              <span>Source: Science Daily</span>
              <span>•</span>
              <span>Trust Score: 92%</span>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 leading-relaxed mb-4">
                A new comprehensive climate study has been released by leading research institutions,
                showing that global temperatures are rising faster than previously predicted by climate models.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Key Findings</h2>
              <ul className="text-white/80 space-y-2">
                <li>Temperature increases exceed previous model predictions by 15%</li>
                <li>Ocean acidification rates have accelerated significantly</li>
                <li>Arctic ice melting patterns show concerning trends</li>
                <li>Extreme weather events correlation strengthened</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Verification Process</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Our AI-powered verification system analyzed this claim through multiple credible sources,
                cross-referenced with peer-reviewed journals, and validated the methodology used in the study.
              </p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "92%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-6"
              />
              <p className="text-sm text-white/60 mt-2">Trust Score: 92%</p>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
