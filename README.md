# Microsoft AI Agent Platform Selector

An interactive decision-tree tool that helps you choose the right Microsoft AI agent platform — SaaS, Copilot Studio, Foundry, or GPUs/containers — based on Microsoft's Cloud Adoption Framework.

[Live Demo] [License: MIT] [Built with Vite]

## 🔗 Live Demo

Coming soon (deploying to Netlify)

## 📸 Screenshot

_Screenshot coming after deploy._

## 🎯 Why this exists

This tool is built on Microsoft's Cloud Adoption Framework guidance for AI agent technology selection — [AI agent technology plan](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy) — and turns that enterprise architecture documentation into an interactive decision tool. Choosing between SaaS Copilots, Copilot Studio, Microsoft Foundry, and custom GPU/container deployments is one of the first real decisions enterprises face when adopting AI agents, and the official guidance is dense. This tool walks users through 9 structured questions and gives a recommendation with reasoning, trade-offs, and links to the relevant Microsoft Learn pages.

## 🧭 How the decision logic works

The selector asks 9 questions covering the dimensions that drive platform choice:

1. **Task nature** — is this generative reasoning or static/deterministic logic?
2. **Domain fit** — does an existing Microsoft SaaS Copilot match the use case (M365, coding, data, Azure ops, customer service, security)?
3. **Agent autonomy** — retrieval, task, or fully autonomous?
4. **Team capability** — business users, mixed, or professional developers?
5. **Data sensitivity** — public, internal, or confidential/regulated?
6. **Custom model** — catalog models or bring-your-own?
7. **Complexity triggers** — security boundaries, multiple teams, planned growth (multi-select)
8. **Timeline** — weeks, months, or strategic long-term?
9. **Customization depth** — minimal, moderate, or deep custom logic?

Answers are evaluated against an ordered rule set that produces one of **five outcomes**:

- **Not an agent** — the task is deterministic; classical code or ML is a better fit
- **SaaS Copilot** — a ready-made Microsoft Copilot covers the domain
- **Copilot Studio** — low-code SaaS for business/mixed teams with moderate customization
- **Foundry** — pro-code PaaS (default fallback for custom builds)
- **Foundry hosted (BYO model)** — managed runtime with your own model
- **IaaS** — GPUs/containers when BYO model meets regulated data, deep custom logic, or full autonomy

Layered on top, a separate **multi-agent vs single-agent verdict** is computed from the complexity triggers — so the recommendation tells you not just *what platform*, but whether to plan for orchestration from the start.

## ⚙️ Tech stack

- React 18
- Vite
- Plain CSS with Fluent 2 design tokens
- No external UI libraries

## 🚀 Run locally

```
git clone https://github.com/MrKhaled007/ms-agent-platform-selector.git
cd ms-agent-platform-selector
npm install
npm run dev
```

## 📦 Deploy to Netlify

- **Option A (fastest):** Run `npm run build`, then drag the `dist` folder onto [netlify.com/drop](https://app.netlify.com/drop).
- **Option B (recommended for updates):** At [netlify.com](https://app.netlify.com), click **Add new site → Import an existing project**, connect GitHub, and select this repo. Netlify auto-detects the settings from `netlify.toml`.

## 🎓 Microsoft Student Ambassador

This project is part of my Microsoft Student Ambassador Community Influencer journey. All Microsoft Learn links in the app include the MSA tracking parameter (`?wt.mc_id=studentamb_513105`) so visits contribute toward the Preferred Visitors milestone. Learn more about the program at [studentambassadors.microsoft.com](https://studentambassadors.microsoft.com/).

## 📚 Reference

- [AI agent technology plan — Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy)

## 📄 License

MIT

## 👤 Built by

**Mohammed Khaled**, Microsoft Student Ambassador (Contributor ID: `studentamb_513105`). GitHub: [@MrKhaled007](https://github.com/MrKhaled007)
