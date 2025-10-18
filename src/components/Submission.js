import React, { useMemo, useState } from 'react';
import TrustGauge from './TrustGauge';
import { useI18n } from '../i18n';

// Minimal local demo: analyze a short claim and show a mock trust score with cross-refs
function DemoClaimAnalyzer() {
  const [text, setText] = useState('Claim: A new virus variant spreads via 5G towers.');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sources = useMemo(
    () => [
      { title: 'WHO Myth-busters', url: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters', stance: 'refutes' },
      { title: 'CDC Rumor Control', url: 'https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/share-facts.html', stance: 'refutes' },
      { title: 'Peer-reviewed study (Nature)', url: 'https://www.nature.com/', stance: 'unrelated' },
    ],
    []
  );

  const analyze = () => {
    if (!text || text.trim().length < 10) {
      setResult({ score: 40, verdict: 'insufficient-input', reasons: ['Provide a clearer claim with context.'] });
      return;
    }
    setLoading(true);
    // Mock scoring logic with simple heuristics; replace with real agent back-end later
    setTimeout(() => {
      const lowered = text.toLowerCase();
      let score = 50;
      const redFlags = ['5g', 'microchip', 'hoax', 'fake', 'miracle cure', 'chemtrail'];
      const greenFlags = ['according to', 'study', 'source', 'who', 'cdc', 'doi:', 'dataset'];
      redFlags.forEach((k) => lowered.includes(k) && (score -= 12));
      greenFlags.forEach((k) => lowered.includes(k) && (score += 8));
      score = Math.min(100, Math.max(0, score));
      const verdict = score >= 70 ? 'likely-true' : score >= 45 ? 'uncertain' : 'likely-false';
      setResult({ score, verdict, reasons: ['Heuristic-only demo. Cross-reference authoritative sources.'] });
      setLoading(false);
    }, 700);
  };

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card p-6 rounded-2xl border border-primary/20">
        <h4 className="text-xl font-semibold text-white mb-3">Try the Claim Analyzer (demo)</h4>
        <textarea
          className="w-full h-28 p-3 bg-dark/60 border border-primary/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste a short claim or headline..."
        />
        <div className="mt-3 flex items-center gap-3">
          <button onClick={analyze} disabled={loading} className="px-4 py-2 neon-btn rounded-lg disabled:opacity-60">
            {loading ? 'Analyzing…' : 'Analyze Claim'}
          </button>
          <span className="text-sm text-white/60">No data leaves your browser in this demo.</span>
        </div>
        {result && (
          <div className="mt-5 flex items-center gap-6">
            <div className="w-40">
              <TrustGauge value={result.score} />
            </div>
            <div>
              <div className="text-white font-semibold capitalize">Verdict: {result.verdict.replace('-', ' ')}</div>
              <ul className="mt-2 list-disc list-inside text-white/80 text-sm">
                {result.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="glass-card p-6 rounded-2xl border border-primary/20">
        <h4 className="text-xl font-semibold text-white mb-3">Example cross-references</h4>
        <p className="text-white/80 text-sm mb-4">Authoritative sources to verify health-related claims:</p>
        <ul className="space-y-3">
          {sources.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-1 h-2.5 w-2.5 rounded-full ${s.stance === 'refutes' ? 'bg-red-400' : s.stance === 'supports' ? 'bg-green-400' : 'bg-yellow-400'}`} />
              <a className="text-primary hover:underline" href={s.url} target="_blank" rel="noreferrer">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Submission() {
  const { t } = useI18n();
  return (
    <section id="submission" className="scroll-mt-24 py-20 bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">{t('submission.title')}</h2>
        <p className="mt-3 text-white/80 max-w-3xl">{t('submission.tagline')}</p>

        {/* Outline grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold text-white">What we will build</h3>
            <ul className="mt-4 space-y-3 text-white/80">
              <li>• Streaming ingestion from X/Twitter, Reddit, news RSS, and trusted alerts.</li>
              <li>• Trend detection for clusters of similar claims and narratives.</li>
              <li>• Retrieval-augmented verification against vetted sources (WHO, CDC, UN, peer-reviewed).</li>
              <li>• Agent reasoning to produce human-friendly, audience-specific explainers in multiple languages.</li>
              <li>• Public dashboard + API for partners; alerts when harmful narratives spike.</li>
            </ul>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold text-white">Pain points addressed</h3>
            <ul className="mt-4 space-y-3 text-white/80">
              <li>• Information overload and contradictory claims during crises.</li>
              <li>• Slow manual fact-checking unable to track fast-moving trends.</li>
              <li>• One-size-fits-all corrections that miss cultural/linguistic context.</li>
              <li>• Lack of early warning signals for platform moderators and NGOs.</li>
            </ul>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold text-white">Target audience</h3>
            <ul className="mt-4 space-y-3 text-white/80">
              <li>• Public health agencies and crisis response teams.</li>
              <li>• Newsrooms and fact-checking organizations.</li>
              <li>• Platforms, community moderators, and civil society groups.</li>
              <li>• Concerned citizens seeking trusted, clear explanations.</li>
            </ul>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold text-white">GTM and revenue</h3>
            <ul className="mt-4 space-y-3 text-white/80">
              <li>• SaaS dashboard for agencies/newsrooms: seats + usage-based API.</li>
              <li>• Enterprise integrations (moderation tooling, alerting, SIEM connectors).</li>
              <li>• Grants/partnerships for public-good deployments; freemium citizen app.</li>
              <li>• Data insights reports for research partners and platforms.</li>
            </ul>
          </div>
        </div>

        {/* Demo widget */}
        <DemoClaimAnalyzer />
      </div>
    </section>
  );
}
