// The 9 input questions, in the locked order from the project spec.
// Q7 (complexity_triggers) is the only multi-select question.

export const QUESTIONS = [
  {
    id: 'task_nature',
    title: 'What kind of task does the agent need to perform?',
    subtitle:
      'Agents add value when tasks need flexible reasoning. Static lookups or deterministic transformations are almost always better served by traditional code or classical ML.',
    options: [
      {
        value: 'generative_reasoning',
        label: 'Generative reasoning or open-ended work',
        hint: 'The agent has to interpret natural language, plan steps, or generate content. Examples: summarize unstructured docs, draft tailored responses, route ambiguous requests.',
      },
      {
        value: 'static_or_deterministic',
        label: 'Static lookup or deterministic logic',
        hint: 'Same inputs always produce the same outputs. A workflow tool, SQL query, or classical ML model is a better fit — you do not need an agent.',
      },
    ],
  },

  {
    id: 'domain_fit',
    title: 'Which domain best matches your use case?',
    subtitle:
      'Microsoft ships ready-to-use SaaS Copilots for several common domains. If yours fits, you can deploy in days instead of building from scratch.',
    options: [
      {
        value: 'm365_productivity',
        label: 'Microsoft 365 productivity (Word / Excel / Teams / Outlook)',
        hint: 'Drafting, summarizing, scheduling, or acting over your M365 data.',
      },
      {
        value: 'coding',
        label: 'Software development and coding',
        hint: 'Writing, reviewing, refactoring, or testing code — GitHub Copilot territory.',
      },
      {
        value: 'data_analysis',
        label: 'Data analysis and BI',
        hint: 'Natural-language questions over a data warehouse or lakehouse, dashboards, exploratory analysis.',
      },
      {
        value: 'azure_ops',
        label: 'Azure operations and cloud management',
        hint: 'Troubleshooting Azure resources, generating CLI / ARM / Bicep, cost optimization.',
      },
      {
        value: 'customer_service',
        label: 'Customer service and contact center',
        hint: 'Deflecting tickets, knowledge-base lookups, agent assist for human reps.',
      },
      {
        value: 'security',
        label: 'Security operations (SecOps)',
        hint: 'Investigating alerts, threat hunting, summarizing incidents, automating SOC workflows.',
      },
      {
        value: 'none_of_these',
        label: 'None of these — custom or niche domain',
        hint: 'No Microsoft SaaS Copilot maps cleanly to your use case. You will need to build.',
      },
    ],
  },

  {
    id: 'agent_autonomy',
    title: 'How much autonomy does the agent need?',
    subtitle:
      'Microsoft categorizes agents by independence: retrieval (just answers), task (takes a defined action), or autonomous (plans and executes multi-step work).',
    options: [
      {
        value: 'retrieval',
        label: 'Retrieval — answer questions using knowledge',
        hint: 'The agent fetches information and replies. It does not change anything in external systems.',
      },
      {
        value: 'task',
        label: 'Task — take one or a few defined actions',
        hint: 'Bounded actions like "create a ticket" or "update a record" with clear inputs and outputs.',
      },
      {
        value: 'autonomous',
        label: 'Autonomous — plan and execute multi-step work',
        hint: 'The agent decides what to do, in what order, and may call tools across systems with limited supervision.',
      },
    ],
  },

  {
    id: 'team_capability',
    title: 'Who will build and maintain the agent?',
    subtitle:
      'This drives the choice between low-code (Copilot Studio) and pro-code (Foundry or custom IaaS) platforms.',
    options: [
      {
        value: 'business_users',
        label: 'Business users / citizen developers',
        hint: 'No engineering team. Builders are comfortable with no-code / low-code interfaces like Power Platform.',
      },
      {
        value: 'mixed',
        label: 'Mixed — business users with some developer support',
        hint: 'Business-led with developer assistance for integrations and harder customizations.',
      },
      {
        value: 'pro_developers',
        label: 'Professional developers',
        hint: 'Software engineers who work in code, SDKs, source control, and CI/CD.',
      },
    ],
  },

  {
    id: 'data_sensitivity',
    title: 'What is the sensitivity of the data the agent will touch?',
    subtitle:
      'Highly regulated or sovereign data pushes you toward private networking and stricter isolation — sometimes off the managed PaaS entirely.',
    options: [
      {
        value: 'public',
        label: 'Public — no confidentiality requirements',
        hint: 'Marketing copy, public docs, anything you would publish on your website.',
      },
      {
        value: 'internal',
        label: 'Internal — sensitive but not regulated',
        hint: 'Standard enterprise data: contracts, internal docs, business records.',
      },
      {
        value: 'confidential_regulated',
        label: 'Confidential or regulated (HIPAA, PCI, GDPR, sovereign)',
        hint: 'Health, financial, personal, or sovereign data with strict compliance and isolation requirements.',
      },
    ],
  },

  {
    id: 'custom_model',
    title: 'Do you need a custom or fine-tuned model?',
    subtitle:
      'Catalog models (OpenAI, Anthropic, Meta, Mistral) cover most use cases. Bring-your-own is for specialized requirements that the catalog does not satisfy.',
    options: [
      {
        value: 'no_catalog_is_fine',
        label: 'Catalog models are fine',
        hint: 'Pick from the Foundry model catalog or use the model that ships with your SaaS Copilot.',
      },
      {
        value: 'yes_byo_model',
        label: 'Bring your own / fine-tuned / specialized model',
        hint: 'You need a specific open-source model, a fine-tune you control, or weights that cannot leave your environment.',
      },
    ],
  },

  {
    id: 'complexity_triggers',
    title: 'Which complexity triggers apply? (select all that apply)',
    subtitle:
      'Any of these signals means you should plan for multi-agent architecture from the start — even if you launch with a single agent.',
    multi: true,
    options: [
      {
        value: 'crosses_security_boundaries',
        label: 'The work crosses security or compliance boundaries',
        hint: 'Different parts of the workflow live in domains with different access controls or data residency.',
      },
      {
        value: 'multiple_teams',
        label: 'Multiple teams are involved',
        hint: 'More than one team owns part of the workflow — splitting agents along team boundaries scales better.',
      },
      {
        value: 'known_future_growth',
        label: 'Significant future growth is already planned',
        hint: 'You already know more capabilities or surface areas are coming. Plan for orchestration now, not later.',
      },
      {
        value: 'none',
        label: 'None of the above',
        hint: 'A single agent should be a fine starting point.',
      },
    ],
  },

  {
    id: 'timeline',
    title: 'What is your delivery timeline?',
    subtitle:
      'Tight timelines favor low-code (Copilot Studio). Strategic, transformational projects justify pro-code investment (Foundry or custom IaaS).',
    options: [
      {
        value: 'weeks',
        label: 'Weeks — need to ship fast',
        hint: 'MVP in 2–6 weeks. Low-code is usually the path.',
      },
      {
        value: 'months',
        label: 'A few months',
        hint: 'Time for moderate customization but still a near-term business outcome.',
      },
      {
        value: 'strategic_long_term',
        label: 'Strategic, long-term initiative',
        hint: 'Multi-quarter investment with deep integration, custom models, or platform-level commitments.',
      },
    ],
  },

  {
    id: 'customization_depth',
    title: 'How much customization will you need?',
    subtitle:
      'From a thin layer over Microsoft defaults to deep custom logic, orchestration, and integrations.',
    options: [
      {
        value: 'minimal',
        label: 'Minimal — mostly default behavior with light configuration',
        hint: 'Prompts and a few connectors. No custom code paths.',
      },
      {
        value: 'moderate',
        label: 'Moderate — some custom flows or integrations',
        hint: 'Custom topics, branching, calls to your APIs — but no novel architecture.',
      },
      {
        value: 'deep_custom_logic',
        label: 'Deep custom logic, orchestration, or integrations',
        hint: 'Custom multi-agent orchestration, advanced state management, custom runtime, or specialized frameworks.',
      },
    ],
  },
];
