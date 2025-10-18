import React from 'react';
import { useI18n } from '../i18n';

export default function ArticleModal({ open, onClose, article }) {
  const { t } = useI18n();
  if (!open || !article) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative glass-card max-w-2xl w-full p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
          aria-label="Close"
        >
          ✖
        </button>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">{article.title}</h3>
          <div className="text-sm text-gray-400">
            <span className="font-medium">{article.source}</span> • {article.time}
          </div>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg"
            loading="lazy"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/800x400/1e2740/6ee7b7?text=VerityGuard')}
          />
          <p className="text-gray-300 leading-relaxed">
            {article.excerpt} This is placeholder extended content for the article. In the future, attach
            the full text, citations, and verification reasoning here.
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">{t('modal.share')}</button>
            <button className="neon-button" onClick={onClose}>{t('modal.analyze')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
