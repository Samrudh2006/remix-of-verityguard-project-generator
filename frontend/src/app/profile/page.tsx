'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Award, TrendingUp, User } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { usersAPI } from '@/lib/api';
import toast from 'react-hot-toast';

interface UserStats {
  user_id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  points: number;
  rank: string;
  leaderboard_rank: number;
  badges: Array<{
    id: number;
    name: string;
    description: string;
    icon_url: string | null;
    awarded_at: string;
  }>;
  badge_count: number;
  points_to_next_rank: number;
}

export default function ProfilePage() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await usersAPI.get(user.id);
      setStats(data);
    } catch (error) {
      toast.error('Failed to load profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please log in to view your profile
          </p>
          <Link
            href="/login"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            {t('nav.login')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('app_name')}
            </span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/feed" className="text-gray-600 hover:text-primary-600">
              {t('nav.feed')}
            </Link>
            <Link href="/leaderboard" className="text-gray-600 hover:text-primary-600">
              {t('nav.leaderboard')}
            </Link>
            <Link href="/profile" className="text-primary-600 font-semibold">
              {t('nav.profile')}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
          </div>
        ) : stats ? (
          <>
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
            >
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary-600 dark:text-primary-300" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stats.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{stats.email}</p>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold">
                      {stats.rank.toUpperCase()}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Leaderboard Rank: #{stats.leaderboard_rank}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.points.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('gamification.points')}</p>
                {stats.points_to_next_rank > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    {stats.points_to_next_rank} to next rank
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.badge_count}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('gamification.badges')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8 text-primary-600" />
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    #{stats.leaderboard_rank}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('gamification.rank')}</p>
              </motion.div>
            </div>

            {/* Badges Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('profile.my_badges')}
              </h2>
              {stats.badges.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {stats.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <Award className="w-10 h-10 text-yellow-500" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {badge.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  No badges earned yet. Keep verifying articles to earn your first badge!
                </p>
              )}
            </motion.div>
          </>
        ) : null}
      </main>
    </div>
  );
}
