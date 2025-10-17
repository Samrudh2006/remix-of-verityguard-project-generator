'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, CheckCircle, Users, Award } from 'lucide-react';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('app_name')}
            </span>
          </div>
          <nav className="flex items-center space-x-6">
            <Link
              href="/feed"
              className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              {t('nav.feed')}
            </Link>
            <Link
              href="/leaderboard"
              className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              {t('nav.leaderboard')}
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              {t('nav.login')}
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t('nav.signup')}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/signup"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-lg font-semibold"
            >
              {t('hero.cta_primary')}
            </Link>
            <Link
              href="/feed"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors text-lg font-semibold"
            >
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              AI Verification
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Advanced AI models analyze articles and cross-check claims against trusted sources.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <Award className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Earn Rewards
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get points and badges for verifying articles and contributing to the community.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <Users className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Community Powered
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join thousands of truth-seekers fighting misinformation together.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
