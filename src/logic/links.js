// Centralized Microsoft link registry, MSA-eligibility-compliant.
// Every URL surfaced in the UI is tagged with the Contributor ID AND validated
// against the official MSA-eligible URL prefix list at module load time.

export const MSA_TAG = '?wt.mc_id=studentamb_513105';
const MSA_PARAM = 'wt.mc_id=studentamb_513105';

// Locale segments like /en-us/, /fr-fr/ make a URL structurally ineligible for
// MSA Preferred Visitors. Strip them before appending the tracking tag.
const LOCALE_SEGMENT_AFTER_DOMAIN = /^(https?:\/\/[^/?#]+)\/[a-z]{2}-[a-z]{2}(?=\/|\?|#|$)/;

export function tag(url) {
  if (!url) return url;
  const stripped = url.replace(LOCALE_SEGMENT_AFTER_DOMAIN, '$1');
  const hashIdx = stripped.indexOf('#');
  const base = hashIdx >= 0 ? stripped.slice(0, hashIdx) : stripped;
  const fragment = hashIdx >= 0 ? stripped.slice(hashIdx) : '';
  const separator = base.includes('?') ? '&' : '?';
  return base + separator + MSA_PARAM + fragment;
}

// Source citation for the Cloud Adoption Framework doc this tool encodes.
// Deliberately NOT tagged — the path is not on the MSA-eligible list, so we
// credit the source without trying to count it toward Preferred Visitors.
export const SOURCE_LINK = {
  label: 'Source: Microsoft Cloud Adoption Framework',
  url: 'https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy',
};

const RAW_LINKS = {
  not_an_agent: [
    { label: 'Microsoft Fabric overview', url: 'https://learn.microsoft.com/fabric' },
    { label: 'Azure for students', url: 'https://azure.microsoft.com/free/students' },
    { label: 'Microsoft Developer hub', url: 'https://developer.microsoft.com' },
    { label: 'Microsoft Learn for developers', url: 'https://learn.microsoft.com/developer' },
  ],
  saas_m365: [
    { label: 'Microsoft 365 Copilot overview', url: 'https://microsoft.com/microsoft-365-copilot' },
    { label: 'Microsoft Learn: Copilot', url: 'https://learn.microsoft.com/copilot' },
    { label: 'Copilot Learning Center', url: 'https://microsoft.com/microsoft-365/copilot-learning-center' },
    { label: 'Copilot home', url: 'https://copilot.microsoft.com' },
  ],
  saas_coding: [
    { label: 'Microsoft Learn for developers', url: 'https://learn.microsoft.com/developer' },
    { label: 'Microsoft Developer hub', url: 'https://developer.microsoft.com' },
    { label: 'Microsoft Learn: Copilot', url: 'https://learn.microsoft.com/copilot' },
    { label: 'DevBlogs', url: 'https://devblogs.microsoft.com' },
  ],
  saas_data: [
    { label: 'Microsoft Fabric overview', url: 'https://learn.microsoft.com/fabric' },
    { label: 'Microsoft Fabric homepage', url: 'https://microsoft.com/microsoft-fabric' },
    { label: 'Fabric Blog', url: 'https://blog.fabric.microsoft.com' },
    { label: 'Fabric Community', url: 'https://community.fabric.microsoft.com' },
  ],
  saas_azure: [
    { label: 'Microsoft Learn: Copilot', url: 'https://learn.microsoft.com/copilot' },
    { label: 'Azure homepage', url: 'https://azure.microsoft.com' },
    { label: 'Azure for students', url: 'https://azure.microsoft.com/free/students' },
    { label: 'Microsoft Developer hub', url: 'https://developer.microsoft.com' },
  ],
  saas_customer_service: [
    { label: 'Microsoft 365 Copilot overview', url: 'https://microsoft.com/microsoft-365-copilot' },
    { label: 'Microsoft Learn: Copilot', url: 'https://learn.microsoft.com/copilot' },
    { label: 'Copilot home', url: 'https://copilot.microsoft.com' },
    { label: 'Copilot Learning Center', url: 'https://microsoft.com/microsoft-365/copilot-learning-center' },
  ],
  saas_security: [
    { label: 'Microsoft Learn: Copilot', url: 'https://learn.microsoft.com/copilot' },
    { label: 'Copilot home', url: 'https://copilot.microsoft.com' },
    { label: 'Microsoft Learn for developers', url: 'https://learn.microsoft.com/developer' },
    { label: 'Microsoft Developer hub', url: 'https://developer.microsoft.com' },
  ],
  copilot_studio: [
    { label: 'Microsoft Learn: Copilot', url: 'https://learn.microsoft.com/copilot' },
    { label: 'Copilot Learning Center', url: 'https://microsoft.com/microsoft-365/copilot-learning-center' },
    { label: 'Microsoft 365 Copilot overview', url: 'https://microsoft.com/microsoft-365-copilot' },
    { label: 'Copilot home', url: 'https://copilot.microsoft.com' },
  ],
  foundry: [
    { label: 'Azure homepage', url: 'https://azure.microsoft.com' },
    { label: 'Azure for students', url: 'https://azure.microsoft.com/free/students' },
    { label: 'Microsoft Learn for developers', url: 'https://learn.microsoft.com/developer' },
    { label: 'Microsoft Developer hub', url: 'https://developer.microsoft.com' },
    { label: 'DevBlogs', url: 'https://devblogs.microsoft.com' },
  ],
  foundry_hosted_byo: [
    { label: 'Azure homepage', url: 'https://azure.microsoft.com' },
    { label: 'Azure for students', url: 'https://azure.microsoft.com/free/students' },
    { label: 'Microsoft Learn for developers', url: 'https://learn.microsoft.com/developer' },
    { label: 'Microsoft Developer hub', url: 'https://developer.microsoft.com' },
  ],
  iaas: [
    { label: 'Azure homepage', url: 'https://azure.microsoft.com' },
    { label: 'Azure for students', url: 'https://azure.microsoft.com/free/students' },
    { label: 'Microsoft Learn for developers', url: 'https://learn.microsoft.com/developer' },
    { label: 'Microsoft Developer hub', url: 'https://developer.microsoft.com' },
  ],
};

export const LINKS = Object.fromEntries(
  Object.entries(RAW_LINKS).map(([key, items]) => [
    key,
    items.map((item) => ({ ...item, url: tag(item.url) })),
  ]),
);

// ---------- MSA eligibility guard ----------
// Runs once at module load. Any URL that is missing the tag, contains a locale
// segment, or does not start with an MSA-eligible prefix crashes the build.

const ELIGIBLE_PREFIXES = [
  'https://azure.microsoft.com',
  'https://code.visualstudio.com',
  'https://developer.microsoft.com',
  'https://devblogs.microsoft.com',
  'https://dotnet.microsoft.com',
  'https://learn.microsoft.com/developer',
  'https://learn.microsoft.com/copilot',
  'https://learn.microsoft.com/fabric',
  'https://learn.microsoft.com/startups',
  'https://learn.microsoft.com/training/topics/startups',
  'https://learn.microsoft.com/power-automate',
  'https://learn.microsoft.com/power-apps',
  'https://learn.microsoft.com/power-bi',
  'https://learn.microsoft.com/power-platform',
  'https://learn.microsoft.com/power-pages',
  'https://microsoft.com/microsoft-cloud/blog',
  'https://microsoft.com/startups',
  'https://microsoft.com/microsoft-365-copilot',
  'https://microsoft.com/microsoft-365/copilot-learning-center',
  'https://microsoft.com/microsoft-copilot/for-individuals',
  'https://microsoft.com/microsoft-fabric',
  'https://microsoft.com/power-platform',
  'https://microsoft.com/insidetrack',
  'https://imaginecup.microsoft.com',
  'https://copilot.microsoft.com',
  'https://blog.fabric.microsoft.com',
  'https://community.fabric.microsoft.com',
  'https://community.powerplatform.com',
  'https://powerbi.microsoft.com/blog',
  'https://events.microsoft.com',
  'https://reactor.microsoft.com',
  'https://studentambassadors.microsoft.com',
  'https://techcommunity.microsoft.com',
];

// Reject /learn.microsoft.com/plans/... explicitly — MSA rules exclude Learn Plans.
const EXCLUDED_PATTERNS = [/^https?:\/\/learn\.microsoft\.com\/plans(\/|$|\?|#)/];

// A locale segment anywhere in the path renders the URL ineligible.
const LOCALE_ANYWHERE = /\/[a-z]{2}-[a-z]{2}(\/|\?|#|$)/;

function matchesEligiblePrefix(url) {
  return ELIGIBLE_PREFIXES.some((prefix) => {
    if (!url.startsWith(prefix)) return false;
    const remainder = url.slice(prefix.length);
    // Require a clean boundary so /microsoft-365-copilot does not silently
    // match /microsoft-365-copilot-evil or similar accidental overlaps.
    return (
      remainder === '' ||
      remainder.startsWith('/') ||
      remainder.startsWith('?') ||
      remainder.startsWith('#')
    );
  });
}

(function assertMsaCompliance() {
  const failures = [];
  for (const [key, items] of Object.entries(LINKS)) {
    items.forEach((item) => {
      const url = item.url;
      if (typeof url !== 'string') {
        failures.push(`[${key}] non-string url: ${String(url)}`);
        return;
      }
      if (!url.includes(MSA_PARAM)) {
        failures.push(`[${key}] missing MSA Contributor ID: ${url}`);
      }
      if (LOCALE_ANYWHERE.test(url)) {
        failures.push(`[${key}] contains a locale segment: ${url}`);
      }
      if (EXCLUDED_PATTERNS.some((re) => re.test(url))) {
        failures.push(`[${key}] matches an excluded pattern (e.g. /plans/): ${url}`);
      }
      if (!matchesEligiblePrefix(url)) {
        failures.push(`[${key}] not on the MSA-eligible prefix list: ${url}`);
      }
    });
  }
  if (failures.length > 0) {
    throw new Error(
      'MSA eligibility check failed for ' +
        failures.length +
        ' URL(s):\n  ' +
        failures.join('\n  '),
    );
  }
})();
