"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="glass-card mt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-white/60">
            {t("copyright")}
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-white/60 hover:text-white transition-colors">
              {t("privacy")}
            </a>
            <a href="/terms" className="text-white/60 hover:text-white transition-colors">
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
