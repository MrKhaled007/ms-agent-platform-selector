// Decision engine for the Microsoft AI Agent Platform Selector.
// Rules are evaluated in the exact order specified in the project anchor doc.
// First match wins; "foundry" is the default fallback.

// Returns one of:
//   'not_an_agent' | 'iaas' | 'foundry_hosted_byo' | 'saas' | 'copilot_studio' | 'foundry'
export function decide(answers) {
  // PRE-CHECK — a non-generative task is not an agent use case at all.
  if (answers.task_nature === 'static_or_deterministic') {
    return 'not_an_agent';
  }

  const byo = answers.custom_model === 'yes_byo_model';

  // RULE 1 — BYO model with regulated data, deep custom logic, or autonomous behavior
  //          needs full control of the stack: GPUs and containers (IaaS).
  if (
    byo &&
    (answers.data_sensitivity === 'confidential_regulated' ||
      answers.customization_depth === 'deep_custom_logic' ||
      answers.agent_autonomy === 'autonomous')
  ) {
    return 'iaas';
  }

  // RULE 1b — BYO model without those triggers can ride Foundry's managed runtime.
  if (byo) {
    return 'foundry_hosted_byo';
  }

  // RULE 2 — A ready-made SaaS Copilot wins when the domain fits, customization is
  //          minimal, no BYO is needed, and the agent only retrieves or takes simple actions.
  if (
    answers.domain_fit !== 'none_of_these' &&
    answers.customization_depth === 'minimal' &&
    answers.custom_model === 'no_catalog_is_fine' &&
    (answers.agent_autonomy === 'retrieval' || answers.agent_autonomy === 'task')
  ) {
    return 'saas';
  }

  // RULE 3 — Business / mixed teams with minimal-to-moderate customization on a
  //          weeks/months timeline → Copilot Studio (low-code SaaS).
  if (
    (answers.team_capability === 'business_users' || answers.team_capability === 'mixed') &&
    (answers.customization_depth === 'minimal' || answers.customization_depth === 'moderate') &&
    (answers.timeline === 'weeks' || answers.timeline === 'months')
  ) {
    return 'copilot_studio';
  }

  // RULE 4 — Default: Microsoft Foundry (pro-code PaaS).
  return 'foundry';
}

// Returns { isMulti: boolean, activeTriggers: string[] }.
// "none" is filtered out — only real triggers count.
export function multiAgentVerdict(answers) {
  const raw = Array.isArray(answers.complexity_triggers) ? answers.complexity_triggers : [];
  const activeTriggers = raw.filter((t) => t && t !== 'none');
  return { isMulti: activeTriggers.length > 0, activeTriggers };
}

// Sub-routes a SaaS recommendation to the right Copilot bucket based on domain.
// Returns the LINKS key (e.g. 'saas_m365') so the recommendation page can pick links.
export function saasDomainKey(answers) {
  switch (answers.domain_fit) {
    case 'm365_productivity':
      return 'saas_m365';
    case 'coding':
      return 'saas_coding';
    case 'data_analysis':
      return 'saas_data';
    case 'azure_ops':
      return 'saas_azure';
    case 'customer_service':
      return 'saas_customer_service';
    case 'security':
      return 'saas_security';
    default:
      return 'saas_m365';
  }
}

/* ------------------------------------------------------------------ */
/* Inline test cases — sanity-check the rule order without a runner.   */
/* ------------------------------------------------------------------ */

/**
 * Test 1 — PRE-CHECK fires: a static/deterministic task is never an agent use case.
 * input:
 *   { task_nature: 'static_or_deterministic', domain_fit: 'm365_productivity',
 *     agent_autonomy: 'retrieval', team_capability: 'business_users',
 *     data_sensitivity: 'public', custom_model: 'no_catalog_is_fine',
 *     complexity_triggers: ['none'], timeline: 'weeks',
 *     customization_depth: 'minimal' }
 * decide()             → 'not_an_agent'
 * multiAgentVerdict()  → { isMulti: false, activeTriggers: [] }
 */

/**
 * Test 2 — Clean SaaS path: M365 productivity, retrieval-only, minimal customization.
 * input:
 *   { task_nature: 'generative_reasoning', domain_fit: 'm365_productivity',
 *     agent_autonomy: 'retrieval', team_capability: 'business_users',
 *     data_sensitivity: 'internal', custom_model: 'no_catalog_is_fine',
 *     complexity_triggers: ['none'], timeline: 'weeks',
 *     customization_depth: 'minimal' }
 * decide()             → 'saas'          (sub-routes via saasDomainKey → 'saas_m365')
 * multiAgentVerdict()  → { isMulti: false, activeTriggers: [] }
 */

/**
 * Test 3 — BYO model + regulated data forces IaaS even though the team is pro-code.
 * input:
 *   { task_nature: 'generative_reasoning', domain_fit: 'none_of_these',
 *     agent_autonomy: 'task', team_capability: 'pro_developers',
 *     data_sensitivity: 'confidential_regulated', custom_model: 'yes_byo_model',
 *     complexity_triggers: ['crosses_security_boundaries'],
 *     timeline: 'strategic_long_term', customization_depth: 'deep_custom_logic' }
 * decide()             → 'iaas'
 * multiAgentVerdict()  → { isMulti: true, activeTriggers: ['crosses_security_boundaries'] }
 */

/**
 * Test 4 — BYO model without regulated/deep/autonomous triggers lands on the
 *          Foundry hosted-runtime fallback.
 * input:
 *   { task_nature: 'generative_reasoning', domain_fit: 'data_analysis',
 *     agent_autonomy: 'task', team_capability: 'pro_developers',
 *     data_sensitivity: 'internal', custom_model: 'yes_byo_model',
 *     complexity_triggers: ['none'], timeline: 'months',
 *     customization_depth: 'moderate' }
 * decide()             → 'foundry_hosted_byo'
 * multiAgentVerdict()  → { isMulti: false, activeTriggers: [] }
 */

/**
 * Test 5 — Business user wants moderate customization in weeks → Copilot Studio.
 * input:
 *   { task_nature: 'generative_reasoning', domain_fit: 'customer_service',
 *     agent_autonomy: 'task', team_capability: 'business_users',
 *     data_sensitivity: 'internal', custom_model: 'no_catalog_is_fine',
 *     complexity_triggers: ['none'], timeline: 'weeks',
 *     customization_depth: 'moderate' }
 * decide()             → 'copilot_studio'
 * multiAgentVerdict()  → { isMulti: false, activeTriggers: [] }
 *
 * Note: SaaS (Rule 2) does not fire because customization_depth is 'moderate', not 'minimal'.
 */

/**
 * Test 6 — Pro developers, no domain fit, deep custom logic, multi-agent signals.
 *          No BYO model, so falls through to Foundry default. Multi-agent verdict is true.
 * input:
 *   { task_nature: 'generative_reasoning', domain_fit: 'none_of_these',
 *     agent_autonomy: 'autonomous', team_capability: 'pro_developers',
 *     data_sensitivity: 'internal', custom_model: 'no_catalog_is_fine',
 *     complexity_triggers: ['multiple_teams', 'known_future_growth'],
 *     timeline: 'strategic_long_term', customization_depth: 'deep_custom_logic' }
 * decide()             → 'foundry'
 * multiAgentVerdict()  → { isMulti: true,
 *                          activeTriggers: ['multiple_teams', 'known_future_growth'] }
 */
