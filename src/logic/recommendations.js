// Recommendation content for each possible decide() outcome.
// reasoning(answers) is a function so it can cite the user's actual choices.
// For SaaS, headline and linksKey are also functions so they sub-route by domain_fit.

import { saasDomainKey } from './decisionEngine.js';

// ---------- Short, prose-friendly labels for the answer values ----------

const DOMAIN_PRODUCT = {
  m365_productivity: 'Microsoft 365 Copilot',
  coding: 'GitHub Copilot',
  data_analysis: 'Microsoft Fabric data agents',
  azure_ops: 'Azure Copilot',
  customer_service: 'Dynamics 365 customer service agents',
  security: 'Microsoft Security Copilot',
};

const DOMAIN_SHORT = {
  m365_productivity: 'Microsoft 365 productivity',
  coding: 'software development',
  data_analysis: 'data analysis and BI',
  azure_ops: 'Azure operations',
  customer_service: 'customer service',
  security: 'security operations',
};

const AUTONOMY_SHORT = {
  retrieval: 'retrieval-only',
  task: 'simple task',
  autonomous: 'autonomous multi-step',
};

const CUSTOMIZATION_SHORT = {
  minimal: 'minimal',
  moderate: 'moderate',
  deep_custom_logic: 'deep',
};

const DATA_SHORT = {
  public: 'public',
  internal: 'internal',
  confidential_regulated: 'confidential or regulated',
};

const TEAM_SHORT = {
  business_users: 'business / citizen developers',
  mixed: 'mixed business + developer',
  pro_developers: 'professional developer',
};

const TIMELINE_SHORT = {
  weeks: 'weeks',
  months: 'a few months',
  strategic_long_term: 'a strategic, long-term initiative',
};

// ---------- Dynamic prose helpers ----------

function foundryAgentStyle(answers) {
  if (answers.team_capability === 'business_users') {
    return 'declarative agents (prompt-based, low-code authoring)';
  }
  if (answers.team_capability === 'pro_developers') {
    return 'hosted agents (code-first with a managed runtime)';
  }
  return 'a mix of declarative and hosted agents';
}

function foundrySetupTier(answers) {
  if (answers.data_sensitivity === 'confidential_regulated') {
    return 'the standard setup with private networking (strict compliance and isolation)';
  }
  if (answers.data_sensitivity === 'internal') {
    return 'the standard setup with public networking (enterprise data controls, no isolation required)';
  }
  return 'the basic setup (fastest path to prototyping; no network isolation)';
}

function iaasTriggerReason(answers) {
  const parts = [];
  if (answers.data_sensitivity === 'confidential_regulated') {
    parts.push('handles confidential or regulated data that needs strict isolation');
  }
  if (answers.customization_depth === 'deep_custom_logic') {
    parts.push('demands deep custom orchestration and full runtime control');
  }
  if (answers.agent_autonomy === 'autonomous') {
    parts.push('requires autonomous multi-step agents with limited supervision');
  }
  if (parts.length === 0) return 'sits outside Foundry-managed constraints';
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return parts[0] + ' and ' + parts[1];
  return parts.slice(0, -1).join(', ') + ', and ' + parts[parts.length - 1];
}

// ---------- Recommendations ----------

export const RECOMMENDATIONS = {
  not_an_agent: {
    tier: 'Pre-check',
    headline: "An agent isn't the right tool for this task.",
    reasoning(answers) {
      void answers;
      return (
        'You described the task as static or deterministic — the same inputs always produce the same outputs. ' +
        'Generative agents add cost, latency, and unpredictability without giving you anything you cannot already get from a workflow tool, a SQL query, or a classical ML model. ' +
        'Use the Microsoft AI decision tree below to pick the simpler approach.'
      );
    },
    tradeoffs: [
      'Cheaper, faster, and more predictable than running a generative model.',
      'Output is determined by your code, not a probability distribution — no hallucinations.',
      'You give up the ability to handle ambiguous or open-ended inputs gracefully.',
    ],
    migrationHint: null,
    validationNote:
      'Confirm that a deterministic or rule-based solution actually covers all your cases. If you find genuinely ambiguous inputs that rules cannot handle, that is the signal to revisit and consider an agent.',
    noMultiAgent: true,
    linksKey: 'not_an_agent',
  },

  saas: {
    tier: 'SaaS',
    headline(answers) {
      const product = DOMAIN_PRODUCT[answers.domain_fit] || 'a Microsoft SaaS Copilot';
      return 'Use ' + product + '.';
    },
    reasoning(answers) {
      const product = DOMAIN_PRODUCT[answers.domain_fit] || 'a Microsoft SaaS Copilot';
      const domain = DOMAIN_SHORT[answers.domain_fit] || 'your domain';
      const autonomy = AUTONOMY_SHORT[answers.agent_autonomy] || 'simple';
      return (
        'Your use case is ' + domain + ', which Microsoft already ships as a ready-to-use Copilot (' + product + '). ' +
        'With minimal customization, no bring-your-own model, and ' + autonomy + ' behavior, the prebuilt solution gives you value in days — no platform to stand up, no runtime to operate. ' +
        'Building something custom here would mean reinventing what Microsoft already maintains.'
      );
    },
    tradeoffs: [
      'Days to deploy and almost no operational burden — Microsoft owns the model, runtime, and security.',
      'Customization is intentionally limited to keep the solution governed and stable.',
      "You're committed to Microsoft's roadmap and licensing for that Copilot — switching means rebuilding elsewhere.",
    ],
    migrationHint:
      'If you outgrow the prebuilt Copilot, your customizations and prompts will not transfer — you would rebuild in Copilot Studio (low-code) or Foundry (pro-code). Plan that as a future project, not a one-week change.',
    validationNote:
      'Run a 1–2 week pilot with 3–5 representative scenarios from your real workflows. Confirm the out-of-the-box Copilot covers your top tasks before you license seats across the org.',
    noMultiAgent: true,
    multiAgentNote:
      'SaaS Copilots are single-purpose by design — you cannot make them multi-agent. If your scenario genuinely needs multiple cooperating agents, that is a strong signal to pick Copilot Studio or Foundry instead.',
    linksKey: saasDomainKey,
  },

  copilot_studio: {
    tier: 'Low-code SaaS',
    headline: 'Use Microsoft Copilot Studio.',
    reasoning(answers) {
      const team = TEAM_SHORT[answers.team_capability] || 'your team';
      const customization = CUSTOMIZATION_SHORT[answers.customization_depth] || 'moderate';
      const timeline = TIMELINE_SHORT[answers.timeline] || 'your timeline';
      return (
        'Your team is ' + team + ' and your timeline is ' + timeline + ', with ' + customization + ' customization needs. ' +
        "Copilot Studio's low-code authoring and prebuilt connectors get you to a testable agent fast — without committing engineering capacity to a pro-code platform. " +
        'You can call Foundry models from inside Copilot Studio when you need more reasoning power, so you keep an upgrade path open.'
      );
    },
    tradeoffs: [
      'Low-code authoring means business users can ship without an engineer on every change.',
      "You're constrained to the topics-and-triggers model — deep custom orchestration belongs in Foundry.",
      'Power Platform licensing and governance apply, which can surprise teams new to that ecosystem.',
    ],
    migrationHint:
      'If you later need custom runtime, bring-your-own models, or tighter network isolation, Foundry is your next stop — Copilot Studio agents that already call Foundry models tend to graduate cleanly.',
    validationNote:
      'Use the 60-day free trial to build the agent end-to-end. If the topics-and-connectors model gets you 80% of the way in 1–2 weeks, commit. If you are fighting the platform, that is the signal to consider Foundry.',
    noMultiAgent: false,
    linksKey: 'copilot_studio',
  },

  foundry: {
    tier: 'PaaS',
    headline: 'Use Microsoft Foundry (PaaS).',
    reasoning(answers) {
      const team = TEAM_SHORT[answers.team_capability] || 'your team';
      const customization = CUSTOMIZATION_SHORT[answers.customization_depth] || 'significant';
      const agentStyle = foundryAgentStyle(answers);
      const setupTier = foundrySetupTier(answers);
      return (
        'Your team is ' + team + ' and the work needs ' + customization + ' customization, which puts you past what Copilot Studio can comfortably deliver. ' +
        'We recommend starting with ' + agentStyle + ' on ' + setupTier + '. ' +
        'The Foundry playground lets you validate the model and tool combination in days before you commit to a setup tier.'
      );
    },
    tradeoffs: [
      'Full code control and a managed runtime — no VMs or Kubernetes to babysit.',
      'Higher up-front learning curve than Copilot Studio; you need real engineering capacity.',
      "You own the agent logic and prompts, but Microsoft owns scaling, networking, and the platform's SLA.",
    ],
    migrationHint:
      'If regulated data, sovereign requirements, or full network isolation enter scope later, host your model on AKS or Azure Container Apps and keep most of the agent code unchanged.',
    validationNote:
      'Prototype in the Foundry playground first — a 1–2 week sprint to wire a declarative agent against your data is enough to validate the model and tool combination. Document what you learned before committing to hosted agents and the standard setup.',
    noMultiAgent: false,
    linksKey: 'foundry',
  },

  foundry_hosted_byo: {
    tier: 'PaaS',
    headline: 'Use Microsoft Foundry hosted agents with your own model.',
    reasoning(answers) {
      const data = DATA_SHORT[answers.data_sensitivity] || 'standard';
      const customization = CUSTOMIZATION_SHORT[answers.customization_depth] || 'moderate';
      const autonomy = AUTONOMY_SHORT[answers.agent_autonomy] || 'bounded';
      return (
        'You need to bring your own model, but your data is ' + data + ', customization is ' + customization + ', and the agent autonomy is ' + autonomy + ' — none of those trip the thresholds that would force you onto IaaS. ' +
        "Foundry's hosted-agent runtime lets you point at your own model (from the model catalog or a custom endpoint) while Microsoft manages the orchestration, networking, and scaling. " +
        'You keep model flexibility without taking on cluster operations.'
      );
    },
    tradeoffs: [
      'Bring-your-own model lets you keep fine-tunes or licensed weights without leaving the managed runtime.',
      'You inherit responsibility for model versioning, evaluation, and lifecycle — Microsoft only manages the agent host.',
      "Foundry's runtime constraints still apply — looser than SaaS, tighter than IaaS.",
    ],
    migrationHint:
      'If isolation, sovereignty, or compliance requirements tighten later, AKS or Azure Container Apps serverless GPU is the next step. Your agent code and orchestration patterns generally carry over.',
    validationNote:
      'Validate your BYO model in the Foundry playground (or against the model catalog if it lives there) before wiring it into a hosted agent. Confirm latency, cost, and grounding behavior on your data first — a 1–2 week spike is usually enough.',
    noMultiAgent: false,
    linksKey: 'foundry_hosted_byo',
  },

  iaas: {
    tier: 'IaaS',
    headline: 'Host on GPUs and containers (Azure Container Apps or AKS).',
    reasoning(answers) {
      const trigger = iaasTriggerReason(answers);
      return (
        "You're bringing your own model, and your scenario " + trigger + '. ' +
        'That combination demands a level of control only IaaS provides — host the model on Azure Container Apps with serverless GPU for small language models, or Azure Kubernetes Service for large GPU clusters and high throughput. ' +
        'The agent itself can still run on CPU-backed compute pointed at your hosted model endpoint.'
      );
    },
    tradeoffs: [
      'Maximum control: any model, any framework, your own networking, your own isolation guarantees.',
      'Maximum operational burden: GPU capacity, cluster ops, scaling, patching, and observability are all yours.',
      'Slowest path to first prototype — measure in months, not weeks.',
    ],
    migrationHint:
      "If isolation or compliance requirements ease over time, you can move parts of the workload back to Foundry's standard setup with private networking and shed the cluster-ops burden.",
    validationNote:
      'Start with the smallest viable model on Azure Container Apps with serverless GPU before committing to AKS. Prove the use case at minimum cost — graduate to AKS only when you need larger models or higher throughput.',
    noMultiAgent: false,
    linksKey: 'iaas',
  },
};
