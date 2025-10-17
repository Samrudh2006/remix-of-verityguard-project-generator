"use client";

import { useTranslations } from "next-intl";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { 
  SparklesIcon, 
  TrophyIcon, 
  BoltIcon, 
  UsersIcon 
} from "@heroicons/react/24/outline";

export function FeaturesSection() {
  const t = useTranslations("features");

  const features = [
    {
      icon: SparklesIcon,
      title: t("aiVerification.title"),
      description: t("aiVerification.description"),
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: TrophyIcon,
      title: t("gamification.title"),
      description: t("gamification.description"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BoltIcon,
      title: t("realtime.title"),
      description: t("realtime.description"),
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      icon: UsersIcon,
      title: t("community.title"),
      description: t("community.description"),
      gradient: "from-teal-500 to-green-500",
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <div className="p-6">
                <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.description}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
}
