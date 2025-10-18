import React, { createContext, useContext, useMemo, useState } from 'react';

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.leaderboard': 'Leaderboard',
    'nav.badges': 'Badges',
    'nav.outline': 'Outline',

    'header.login': 'Log in',
    'header.lang.en': 'English',
    'header.lang.hi': 'Hindi',

    'hero.badge': 'AI-POWERED VERIFICATION',
    'hero.title': 'VerityGuard',
    'hero.subtitle': 'Truth in the Digital Age',
    'hero.description': 'VerityGuard uses advanced machine learning to analyze news articles and provide real-time credibility scores. Join thousands of users fighting misinformation.',
    'hero.getStarted': 'Get Started',
    'hero.learnMore': 'Learn More',
    'hero.poweredBy': 'POWERED BY',
    'hero.tech': 'Advanced ML & NLP Technology',

    'hero.stats.articles': 'Articles Verified',
    'hero.stats.accuracy': 'Accuracy Rate',
    'hero.stats.languages': 'Languages',
    'hero.stats.users': 'Active Users',

    'articles.title': 'Latest Articles',
    'articles.filters': 'Filters',
    'tabs.all': 'All',
    'tabs.trending': 'Trending',
    'tabs.recent': 'Recent',
    'tabs.verified': 'Verified',
    'label.trustScore': 'TRUST SCORE',
    'label.trustShield': 'Trust Shield',

    'submission.title': 'Agentic AI: Crisis Misinformation Watch',
    'submission.tagline': 'An AI agent that continuously scans multi-channel content streams, detects emerging misinformation during global or local crises, verifies claims via cross-references, and produces accessible, contextual explanations tailored to diverse audiences.',

    'modal.share': 'Share',
    'modal.analyze': 'Analyze',

    'location.title': 'Set Your Location',
    'location.description': 'Get news relevant to your area. Auto-detect or select manually.',
    'location.current': 'Current Location',
    'location.permissionTitle': 'Location Permission Required',
    'location.permissionText': 'We need your permission to detect your location and show relevant local news. Your location is only used on your device and is not shared.',
    'location.allow': 'Allow Location Access',
    'location.deny': 'Not Now',
    'location.detecting': 'Detecting...',
    'location.autoDetect': 'Auto-Detect My Location',
    'location.or': 'OR',
    'location.selectState': 'Select State',
    'location.chooseState': 'Choose a state...',
    'location.selectCity': 'Select City/Town',
    'location.chooseCity': 'Choose a city...',
    'location.optional': 'optional',
    'location.confirm': 'Confirm Location',
    'location.showingFor': 'Showing news for',
    'location.set': 'Set Location',
    'location.change': 'Change Location',
  },
  hi: {
    'nav.home': 'होम',
    'nav.articles': 'लेख',
    'nav.leaderboard': 'लीडरबोर्ड',
    'nav.badges': 'बैज',
    'nav.outline': 'रूपरेखा',

    'header.login': 'लॉग इन',
    'header.lang.en': 'अंग्रेज़ी',
    'header.lang.hi': 'हिंदी',

    'hero.badge': 'एआई-संचालित सत्यापन',
    'hero.title': 'VerityGuard',
    'hero.subtitle': 'डिजिटल युग में सत्य',
    'hero.description': 'VerityGuard उन्नत मशीन लर्निंग का उपयोग करके समाचार लेखों का विश्लेषण करता है और वास्तविक समय विश्वसनीयता स्कोर प्रदान करता है। गलत सूचना के खिलाफ लड़ाई में हजारों उपयोगकर्ताओं से जुड़ें।',
    'hero.getStarted': 'शुरू करें',
    'hero.learnMore': 'और जानें',
    'hero.poweredBy': 'द्वारा संचालित',
    'hero.tech': 'एडवांस्ड एमएल और एनएलपी टेक्नोलॉजी',

    'hero.stats.articles': 'सत्यापित लेख',
    'hero.stats.accuracy': 'सटीकता दर',
    'hero.stats.languages': 'भाषाएँ',
    'hero.stats.users': 'सक्रिय उपयोगकर्ता',

    'articles.title': 'ताज़ा लेख',
    'articles.filters': 'फ़िल्टर्स',
    'tabs.all': 'सभी',
    'tabs.trending': 'ट्रेंडिंग',
    'tabs.recent': 'हालिया',
    'tabs.verified': 'वेरिफाइड',
    'label.trustScore': 'ट्रस्ट स्कोर',
    'label.trustShield': 'ट्रस्ट शील्ड',

    'submission.title': 'एजेंटिक एआई: संकट गलत सूचना निगरानी',
    'submission.tagline': 'एक एआई एजेंट जो बहु-चैनल कंटेंट स्ट्रीम्स को निरंतर स्कैन करता है, संकटों के दौरान उभरती गलत सूचनाओं का पता लगाता है, क्रॉस-रेफरेंस के माध्यम से दावों की पुष्टि करता है, और विविध दर्शकों के लिए सुलभ, संदर्भित स्पष्टीकरण तैयार करता है।',

    'modal.share': 'साझा करें',
    'modal.analyze': 'विश्लेषण करें',

    'location.title': 'अपना स्थान सेट करें',
    'location.description': 'अपने क्षेत्र से संबंधित समाचार प्राप्त करें। स्वतः पता लगाएं या मैन्युअल रूप से चुनें।',
    'location.current': 'वर्तमान स्थान',
    'location.permissionTitle': 'स्थान अनुमति आवश्यक',
    'location.permissionText': 'आपके स्थान का पता लगाने और संबंधित स्थानीय समाचार दिखाने के लिए हमें आपकी अनुमति चाहिए। आपका स्थान केवल आपके डिवाइस पर उपयोग किया जाता है और साझा नहीं किया जाता है।',
    'location.allow': 'स्थान एक्सेस की अनुमति दें',
    'location.deny': 'अभी नहीं',
    'location.detecting': 'पता लगा रहे हैं...',
    'location.autoDetect': 'मेरे स्थान का स्वतः पता लगाएं',
    'location.or': 'या',
    'location.selectState': 'राज्य चुनें',
    'location.chooseState': 'एक राज्य चुनें...',
    'location.selectCity': 'शहर/कस्बा चुनें',
    'location.chooseCity': 'एक शहर चुनें...',
    'location.optional': 'वैकल्पिक',
    'location.confirm': 'स्थान की पुष्टि करें',
    'location.showingFor': 'समाचार दिखा रहे हैं',
    'location.set': 'स्थान सेट करें',
    'location.change': 'स्थान बदलें',
  },
};

const I18nContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = useMemo(() => (key) => translations[lang]?.[key] ?? translations.en[key] ?? key, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
