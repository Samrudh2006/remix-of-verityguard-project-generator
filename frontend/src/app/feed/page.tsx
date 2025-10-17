'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Filter } from 'lucide-react';
import { articlesAPI } from '@/lib/api';
import { getTrustColor, getTrustBgColor, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Article {
  id: number;
  title: string;
  url: string;
  content: string;
  source_domain: string;
  language: string;
  trust_score: number;
  status: string;
  explanation: string | null;
  created_at: string;
}

export default function FeedPage() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    loadArticles();
  }, [filter]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await articlesAPI.list({ status_filter: filter || undefined });
      setArticles(data);
    } catch (error) {
      toast.error('Failed to load articles');
      console.error(error);
    } finally {
      setLoading(false);
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
            <Link href="/feed" className="text-primary-600 font-semibold">
              {t('nav.feed')}
            </Link>
            <Link href="/leaderboard" className="text-gray-600 hover:text-primary-600">
              {t('nav.leaderboard')}
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-primary-600">
              {t('nav.profile')}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('feed.title')}
          </h1>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">{t('feed.filter_all')}</option>
              <option value="verified">{t('feed.filter_verified')}</option>
              <option value="pending">{t('feed.filter_pending')}</option>
              <option value="unverified">{t('feed.filter_unverified')}</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">{t('feed.no_articles')}</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {article.source_domain} • {formatDate(article.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-semibold mb-1 text-gray-600 dark:text-gray-400">
                      {t('feed.trust_score')}
                    </div>
                    <div
                      className={`text-3xl font-bold ${getTrustColor(article.trust_score)}`}
                    >
                      {article.trust_score.toFixed(1)}
                    </div>
                    <div
                      className={`mt-1 px-3 py-1 rounded-full text-xs font-semibold text-white ${getTrustBgColor(
                        article.trust_score
                      )}`}
                    >
                      {article.status.toUpperCase()}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.content}
                </p>
                {article.explanation && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
                    {article.explanation}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    {t('feed.read_more')} →
                  </a>
                  <div className="space-x-2">
                    <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                      {t('feed.report')}
                    </button>
                    <button className="px-4 py-2 text-sm bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800">
                      {t('feed.share')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
