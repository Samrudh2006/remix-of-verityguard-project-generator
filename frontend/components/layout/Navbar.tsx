"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { 
  HomeIcon, 
  NewspaperIcon, 
  UserCircleIcon, 
  ChartBarIcon,
  TrophyIcon
} from "@heroicons/react/24/outline";

export function Navbar() {
  const t = useTranslations("nav");

  const navItems = [
    { href: "/", label: t("home"), icon: HomeIcon },
    { href: "/feed", label: t("feed"), icon: NewspaperIcon },
    { href: "/leaderboard", label: t("leaderboard"), icon: TrophyIcon },
    { href: "/profile", label: t("profile"), icon: UserCircleIcon },
    { href: "/admin", label: t("admin"), icon: ChartBarIcon },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              >
                ⚡ VerityGuard
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
