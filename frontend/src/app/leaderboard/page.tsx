'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Trophy, Award } from 'lucide-react';
import { usersAPI } from '@/lib/api';
import toast from 'react-hot-toast';

interface LeaderboardEntry {
  rank: number;
  user_id: number;
  name: string;
  avatar_url: string | null;
  points: number;
  rank_tier: string;
  badge_count: number;
}

export default function LeaderboardPage() {
  const { t } = useTranslation();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all_time');

  useEffect(() => {
    loadLeaderboard();
  }, [timeframe]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await usersAPI.leaderboard({ timeframe });
      setLeaderboard(data);
    } catch (error) {
      toast.error('Failed to load leaderboard');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (tier: string) => {
    switch (tier) {
      case 'verified_guardian':
        return 'text-purple-500';
      case 'platinum':
        return 'text-gray-400';
      case 'gold':
        return 'text-yellow-500';
      case 'silver':
        return 'text-gray-300';
      default:
        return 'text-orange-600';
    }
  };

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
            <Link href="/leaderboard" className="text-primary-600 font-semibold">
              {t('nav.leaderboard')}
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-primary-600">
              {t('nav.profile')}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <Trophy className="w-10 h-10 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('leaderboard.title')}
            </h1>
          </div>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all_time">{t('leaderboard.all_time')}</option>
            <option value="weekly">{t('leaderboard.weekly')}</option>
            <option value="monthly">{t('leaderboard.monthly')}</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('leaderboard.rank')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('leaderboard.user')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('leaderboard.points')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('leaderboard.badges')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {leaderboard.map((entry, index) => (
                  <motion.tr
                    key={entry.user_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {entry.rank <= 3 ? (
                          <Trophy
                            className={`w-6 h-6 ${
                              entry.rank === 1
                                ? 'text-yellow-500'
                                : entry.rank === 2
                                ? 'text-gray-400'
                                : 'text-orange-600'
                            }`}
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            #{entry.rank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 dark:text-primary-300 font-bold">
                            {entry.name[0].toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {entry.name}
                          </div>
                          <div className={`text-sm ${getRankColor(entry.rank_tier)}`}>
                            {entry.rank_tier.replace('_', ' ').toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {entry.points.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {entry.badge_count}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
