import { useState } from 'react';
import { decide, multiAgentVerdict } from '../logic/decisionEngine.js';
import { RECOMMENDATIONS } from '../logic/recommendations.js';
import { LINKS } from '../logic/links.js';
import LinkCard from './LinkCard.jsx';
import ValidationCallout from './ValidationCallout.jsx';

const TIER_BADGE_CLASS = {
  SaaS: 'tier-badge tier-badge--saas',
  'Low-code SaaS': 'tier-badge tier-badge--low-code',
  PaaS: 'tier-badge tier-badge--paas',
  IaaS: 'tier-badge tier-badge--iaas',
  'Pre-check': 'tier-badge tier-badge--precheck',
};

const TRIGGER_LABELS = {
  crosses_security_boundaries:
    'Work crosses security or compliance boundaries',
  multiple_teams: 'Multiple teams are involved',
  known_future_growth: 'Significant future growth is already planned',
};

function resolve(value, answers) {
  return typeof value === 'function' ? value(answers) : value;
}

export default function RecommendationPage({ answers, onStartOver }) {
  const [toast, setToast] = useState('');

  const tierKey = decide(answers);
  const rec = RECOMMENDATIONS[tierKey];
  const headline = resolve(rec.headline, answers);
  const reasoning = rec.reasoning(answers);
  const linksKey = resolve(rec.linksKey, answers);
  const links = LINKS[linksKey] || [];
  const verdict = multiAgentVerdict(answers);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setToast('Link copied');
    } catch {
      setToast('Could not copy link');
    }
    window.setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="recommendation">
      <div>
        <span className={TIER_BADGE_CLASS[rec.tier] || 'tier-badge'}>
          {rec.tier}
        </span>
      </div>

      <h1 className="recommendation__headline">{headline}</h1>

      <section className="section section--why">
        <span className="section__label">Why this fits</span>
        <div className="section__body">{reasoning}</div>
      </section>

      {!rec.noMultiAgent && (
        <section className="section section--architecture">
          <span className="section__label">Architecture</span>
          <div className="section__body">
            {verdict.isMulti
              ? 'Plan for a multi-agent architecture from the start.'
              : 'A single agent is a fine starting point.'}
            {verdict.isMulti && verdict.activeTriggers.length > 0 && (
              <ul className="trigger-list">
                {verdict.activeTriggers.map((t) => (
                  <li key={t}>{TRIGGER_LABELS[t] || t}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <section className="section section--tradeoffs">
        <span className="section__label">Trade-offs you accept</span>
        <ul className="tradeoff-list">
          {rec.tradeoffs.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>

      {rec.migrationHint && (
        <p className="migration-hint">{rec.migrationHint}</p>
      )}

      <ValidationCallout>{rec.validationNote}</ValidationCallout>

      <section>
        <span className="section__label">Next steps on Microsoft Learn</span>
        <div className="link-list">
          {links.map((link) => (
            <LinkCard key={link.url} label={link.label} url={link.url} />
          ))}
        </div>
      </section>

      <div className="rec-footer">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={onStartOver}
        >
          Start over
        </button>
        <button
          type="button"
          className="btn btn--primary"
          onClick={handleShare}
        >
          Share this tool
        </button>
      </div>

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
