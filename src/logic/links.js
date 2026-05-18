// Centralized Microsoft Learn link registry.
// EVERY Microsoft Learn URL surfaced in the app must be routed through `tag()`
// so the Microsoft Student Ambassador tracking parameter is impossible to forget.

export const MSA_TAG = '?wt.mc_id=studentamb_513105';

const MSA_PARAM = 'wt.mc_id=studentamb_513105';

// Append the MSA tracking param to a URL. Handles URLs that already contain
// a query string and/or fragment so the tag survives Microsoft Learn's anchor links.
export function tag(url) {
  if (!url) return url;
  const hashIdx = url.indexOf('#');
  const base = hashIdx >= 0 ? url.slice(0, hashIdx) : url;
  const fragment = hashIdx >= 0 ? url.slice(hashIdx) : '';
  const separator = base.includes('?') ? '&' : '?';
  return base + separator + MSA_PARAM + fragment;
}

// Source article — the Microsoft Cloud Adoption Framework guidance this tool encodes.
const SOURCE_ARTICLE = {
  label: 'Source: AI agent technology plan (Cloud Adoption Framework)',
  url: tag('https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy'),
};

// Single-agent vs multi-agent guidance — referenced by every "build" recommendation.
const SINGLE_VS_MULTI = {
  label: 'Single agent or multiple agents?',
  url: tag('https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/single-agent-multiple-agents'),
};

export const LINKS = {
  not_an_agent: [
    {
      label: 'Microsoft AI decision tree (when to use AI at all)',
      url: tag('https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/ai/strategy#microsoft-ai-decision-tree'),
    },
    SOURCE_ARTICLE,
    {
      label: 'Foundry model catalog (use models directly without an agent)',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-studio/how-to/model-catalog'),
    },
    {
      label: 'Microsoft Fabric data agents (for analytics workloads)',
      url: tag('https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent'),
    },
  ],

  saas_m365: [
    {
      label: 'Microsoft 365 Copilot — App Builder agent',
      url: tag('https://learn.microsoft.com/en-us/copilot/microsoft-365/app-builder-privacy-data-subject-request-faq'),
    },
    {
      label: 'Microsoft 365 Copilot — Workflows agent',
      url: tag('https://learn.microsoft.com/en-us/copilot/microsoft-365/flow-builder-privacy-data-subject-request-faq'),
    },
    {
      label: 'Microsoft 365 Copilot — Researcher agent',
      url: tag('https://learn.microsoft.com/en-us/copilot/microsoft-365/researcher-agent'),
    },
    SOURCE_ARTICLE,
  ],

  saas_coding: [
    {
      label: 'GitHub Copilot coding agent',
      url: tag('https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent'),
    },
    SOURCE_ARTICLE,
  ],

  saas_data: [
    {
      label: 'Microsoft Fabric data agents',
      url: tag('https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent'),
    },
    SOURCE_ARTICLE,
  ],

  saas_azure: [
    {
      label: 'Azure Copilot agents (preview)',
      url: tag('https://learn.microsoft.com/en-us/azure/copilot/agents-preview'),
    },
    SOURCE_ARTICLE,
  ],

  saas_customer_service: [
    {
      label: 'Dynamics 365 customer service agents',
      url: tag('https://learn.microsoft.com/en-us/dynamics365/customer-service/administer/overview-bots'),
    },
    SOURCE_ARTICLE,
  ],

  saas_security: [
    {
      label: 'Microsoft Security Copilot agents',
      url: tag('https://learn.microsoft.com/en-us/copilot/security/agents-overview'),
    },
    SOURCE_ARTICLE,
  ],

  copilot_studio: [
    {
      label: 'Microsoft Copilot Studio — overview',
      url: tag('https://learn.microsoft.com/en-us/microsoft-copilot-studio/'),
    },
    {
      label: 'Copilot Studio — 60-day free trial',
      url: tag('https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing-subscriptions#copilot-studio-for-microsoft-teams-plans'),
    },
    {
      label: 'Copilot Studio — access options & getting started',
      url: tag('https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio#access-copilot-studio'),
    },
    SINGLE_VS_MULTI,
    SOURCE_ARTICLE,
  ],

  foundry: [
    {
      label: 'Microsoft Foundry — overview',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/what-is-azure-ai-foundry'),
    },
    {
      label: 'Foundry — create your first agent (quickstart)',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/agents/quickstart'),
    },
    {
      label: 'Declarative vs. hosted agents (types of agents)',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/agents/concepts/development-lifecycle'),
    },
    {
      label: 'Hosted agents — managed runtime, code-first',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/agents/concepts/hosted-agents'),
    },
    {
      label: 'Foundry Workflows — multi-agent orchestration',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/agents/concepts/workflow'),
    },
    {
      label: 'Foundry Tool catalog (MCP, OpenAPI, Logic Apps, Functions)',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/agents/concepts/tool-catalog'),
    },
    {
      label: 'Foundry model catalog (OpenAI, Anthropic, Meta, Mistral)',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-studio/how-to/model-catalog'),
    },
    {
      label: 'Basic vs. standard agent setup',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/agents/environment-setup#choose-your-setup'),
    },
    {
      label: 'Standard agent setup (private networking, enterprise controls)',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/agents/concepts/standard-agent-setup'),
    },
    {
      label: 'Foundry playground (prototype before you commit)',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/concept-playgrounds'),
    },
    SINGLE_VS_MULTI,
    SOURCE_ARTICLE,
  ],

  foundry_hosted_byo: [
    {
      label: 'Hosted agents — bring your own model with a managed runtime',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/agents/concepts/hosted-agents'),
    },
    {
      label: 'Foundry model catalog (OpenAI, Anthropic, Meta, Mistral, open-source)',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-studio/how-to/model-catalog'),
    },
    {
      label: 'Microsoft Foundry — overview',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/what-is-azure-ai-foundry'),
    },
    {
      label: 'Standard agent setup (enterprise data controls)',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/agents/concepts/standard-agent-setup'),
    },
    {
      label: 'Foundry Tool catalog',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/agents/concepts/tool-catalog'),
    },
    SOURCE_ARTICLE,
  ],

  iaas: [
    {
      label: 'Azure Container Apps — serverless GPU (small language models)',
      url: tag('https://learn.microsoft.com/en-us/azure/container-apps/gpu-serverless-overview'),
    },
    {
      label: 'Azure Kubernetes Service (AKS) — large GPU clusters',
      url: tag('https://learn.microsoft.com/en-us/azure/aks/what-is-aks'),
    },
    {
      label: 'Microsoft Foundry — overview (for managed-runtime comparison)',
      url: tag('https://learn.microsoft.com/en-us/azure/ai-foundry/what-is-azure-ai-foundry'),
    },
    SINGLE_VS_MULTI,
    SOURCE_ARTICLE,
  ],
};

// Defensive guard — runs at module load. Any URL in LINKS that is missing the
// MSA tracking tag crashes the build immediately so an untagged link can never
// ship to production.
(function assertEveryUrlIsTagged(node) {
  if (Array.isArray(node)) {
    node.forEach(assertEveryUrlIsTagged);
    return;
  }
  if (node && typeof node === 'object') {
    if ('url' in node) {
      if (typeof node.url !== 'string' || !node.url.includes(MSA_PARAM)) {
        throw new Error(
          `links.js: URL is missing the MSA tracking tag: ${node.url}`,
        );
      }
    }
    Object.values(node).forEach(assertEveryUrlIsTagged);
  }
})(LINKS);
