export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content?: string;
}

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
}

// Blog posts data - this will be the"database" for now
const BLOG_POSTS_DATA = {
  "flagged-on-github": {
    title:
      "GitHub flagged our organization two weeks ago. I still don't know why.",
    description:
      "A timeline of the flag, the broken services, and the support ticket that has been sitting open for two weeks.",
    date: "2026-04-30",
    author: "Dori",
    tags: ["incident", "github", "open-source"],
    content: `# GitHub flagged our organization two weeks ago. I still don't know why.

![The is-an-ai organization has been flagged.](/blog/flagged-on-github/banner.png)

Two weeks ago, on April 20, 2026, I opened GitHub and saw this banner across every page I visited — not just the org page, but every repository I clicked through:

> **The is-an-ai organization has been flagged.**
>
> Because of that, your organization is hidden from the public. If you believe this is a mistake, contact support to have your organization's status reviewed.

\`is-an-ai\` is the GitHub organization behind [is-an.ai](https://is-an.ai), a small open-source service that gives developers free subdomains under \`*.is-an.ai\`. The model is the same one [is-a.dev](https://is-a.dev) has been using on GitHub for years.

Two weeks later, I still don't know why we were flagged.

## What broke

The moment the flag landed, three things broke at once:

- The org page and all our repositories started returning **404 to anyone not signed in as a member**.
- **OAuth login** stopped working. The OAuth App is owned by the flagged org.
- **Every GitHub Action** in the org stopped firing, so the CI-driven DNS pipeline stopped accepting new registrations.

I contacted GitHub Support the same day. Here is the ticket I filed, verbatim:

> **Please describe your account restriction issue.**
>
> Hi GitHub Support Team,
>
> Our organization, is-an-ai, has been flagged and hidden. We believe this is a mistake and would like to request a review.
>
> **About the Project:**
> is-an-ai is an open-source project providing free subdomains for developers. Registration is managed via Pull Requests, which involves frequent automated CI/CD activities.
>
> **Request:**
> We suspect the flag might be due to our automated PR process or potential misuse of a subdomain by an external user. Please let us know the specific reason for the flag so we can address it immediately.
>
> We are committed to following GitHub's Terms of Service and are ready to take any necessary corrective actions.

Two weeks later, the only response I have received is the auto-generated ticket confirmation.

## What is-an.ai actually does

A user submits a small JSON record file to claim a subdomain. They can do it by hand via PR, or through our website / CLI which uses OAuth and a GitHub App to do the same thing under the hood. A GitHub Action validates the record. A bot merges it. A self-hosted PowerDNS picks up merged records and propagates DNS.

The shape is identical to is-a.dev. The"use a public Git repo as the source of truth for free subdomain records" pattern has been the standard way to run a service like this for years.

## What is broken right now

- **Existing users cannot sign in.** OAuth depends on the flagged org.
- **New registrations through the website and CLI are blocked** at the merge step.
- **Existing subdomains still resolve**, because DNS lives on our own PowerDNS rather than GitHub.

We had migrated the API and database off Cloudflare to AWS earlier this month, so the data plane is fine. The control plane is the part stuck on GitHub.

## Links

- Service: [is-an.ai](https://is-an.ai)
- CLI on npm: [npmjs.com/package/is-an-ai](https://www.npmjs.com/package/is-an-ai)
- Contact: dohyun682@gmail.com
`,
  },
  "cli-and-agent-support": {
    title: "Introducing the is-an.ai CLI and Agent Plugin",
    description:
      "Register subdomains from your terminal or let AI agents do it for you — with the new is-an-ai CLI and plugin support for Claude Code and OpenClaw.",
    date: "2026-03-17",
    author: "is-an.ai Team",
    tags: ["announcement", "cli", "plugin"],
    content: `# Introducing the is-an.ai CLI and Agent Plugin

We're excited to announce a new way to register and manage your \`.is-an.ai\` subdomains: **the is-an-ai CLI**.

## What's New

Until now, you had two options for registering a subdomain: the website or a GitHub Pull Request. Today, we're adding a third — a command-line tool that works in your terminal and integrates directly with AI coding agents.

## The CLI

Install nothing. Just run:

\`\`\`bash
npx is-an-ai check my-project
npx is-an-ai register my-project -t CNAME -v my-project.vercel.app
\`\`\`

That's it. Your subdomain is live.

### Two Modes

**API mode** — Login once with GitHub, then register instantly:

\`\`\`bash
npx is-an-ai login
npx is-an-ai register my-project -t A -v 1.2.3.4
\`\`\`

**PR mode** — No login needed. Uses your existing GitHub token to open a PR that auto-validates and auto-merges:

\`\`\`bash
npx is-an-ai register my-project -t A -v 1.2.3.4 --wait
\`\`\`

The \`--wait\` flag blocks until the PR merges and DNS deploys. Perfect for CI/CD pipelines and AI agents.

### All Commands

| Command | Description |
|---------|-------------|
| \`check <name>\` | Check subdomain availability |
| \`register <name>\` | Register a new subdomain |
| \`update <name>\` | Update DNS records |
| \`delete <name>\` | Delete a subdomain |
| \`list\` | List your subdomains |
| \`login\` / \`logout\` | Manage authentication |

## Agent Plugin Support

The CLI is also available as a plugin for AI coding agents. When installed, agents can register subdomains on your behalf as part of their workflow — for example, deploying a project and setting up a custom domain in one step.

**Claude Code:**
\`\`\`
/plugin marketplace add is-an-ai/cli
/plugin install is-an-ai
\`\`\`

**OpenClaw:**
\`\`\`bash
openclaw plugins install github:is-an-ai/cli
\`\`\`

Once installed, just ask your agent to"register a subdomain on is-an.ai" and it will handle the rest.

## Vendor Subdomains

We've also generalized our vendor verification system. You can now register \`_{vendor}.{subdomain}\` records for any platform — not just Vercel:

\`\`\`bash
npx is-an-ai register _vercel.my-project -t TXT -v"vc-domain-verify=..."
npx is-an-ai register _discord.my-project -t TXT -v"discord-verify=..."
\`\`\`

These records are TXT-only and require ownership of the base subdomain.

## Get Started

\`\`\`bash
npx is-an-ai check your-idea
\`\`\`

- **CLI repo**: [github.com/is-an-ai/cli](https://github.com/is-an-ai/cli)
- **npm**: [npmjs.com/package/is-an-ai](https://www.npmjs.com/package/is-an-ai)
- **Website**: [is-an.ai](https://is-an.ai)
`,
  },
  "getting-started-with-is-an-ai": {
    title: "Getting Started with is-an.ai",
    description:
      "Learn how to register your first AI project subdomain with is-an.ai in just a few clicks",
    date: "2025-05-31",
    author: "is-an.ai Team",
    tags: ["tutorial", "getting-started", "subdomain"],
    content: `# Getting Started with is-an.ai

Welcome to **is-an.ai** - the easiest way to get a professional subdomain for your AI projects! This guide will walk you through everything you need to know to get started.

## Why Choose is-an.ai?

As an AI researcher or enthusiast, you've probably faced the challenge of sharing your projects with the world. Traditional domain registration and DNS management can be:

- **Complex and time-consuming**
- **Expensive for multiple projects**
- **Technically challenging for non-developers**

is-an.ai solves these problems by providing:

✅ **One-click subdomain registration**
✅ **No GitHub or DNS knowledge required**
✅ **Free for AI projects**
✅ **Professional \`.is-an.ai\` domain**

## How It Works

Our process is inspired by the simplicity of Toss (the Korean payment app) - clean, intuitive, and efficient.

### 1. Visit our Registration Portal

Simply go to our website and click"Register Subdomain"

### 2. Choose Your Subdomain

Pick a memorable name for your project:
- \`my-awesome-ai.is-an.ai\`
- \`chatbot-demo.is-an.ai\`
- \`ml-research.is-an.ai\`

### 3. Automatic Setup

We handle all the technical details:
- GitHub repository management
- DNS record creation
- Cloudflare integration
- SSL certificate provisioning

## Best Practices

### Subdomain Naming
- Keep it short and memorable
- Use hyphens for readability
- Avoid numbers unless necessary
- Make it descriptive of your project

### Project Documentation
- Include a clear README
- Add project screenshots
- Explain your AI model/approach
- Provide usage instructions

## Technical Details

### DNS Management
We automatically manage:
- A records pointing to your hosting
- CNAME records for www subdomain
- SSL/TLS certificates via Let's Encrypt
- CDN optimization through Cloudflare

### GitHub Integration
Your subdomain request creates:
- Pull request in our public repository
- Automated validation and approval
- Instant DNS propagation
- Monitoring and health checks

## Getting Support

Need help? We're here for you:

- **Documentation**: Check our comprehensive guides
- **Community**: Join our Discord community
- **GitHub**: Open an issue in our repository

## Next Steps

Ready to get started? Here's what to do next:

1. **Plan your project**: Think about what you want to showcase
2. **Choose a subdomain**: Pick a memorable name
3. **Register**: Use our simple registration form
4. **Deploy**: Upload your project and go live!
`,
  },
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = Object.entries(BLOG_POSTS_DATA).map(([slug, data]) => ({
    slug,
    ...data,
  }));

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  const post = BLOG_POSTS_DATA[slug as keyof typeof BLOG_POSTS_DATA];
  if (!post) return null;

  return {
    slug,
    ...post,
  };
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getTagColor = (tag: string): string => {
  const colors = {
    tutorial: "bg-blue-100 text-blue-800",
    "getting-started": "bg-green-100 text-green-800",
    subdomain: "bg-purple-100 text-purple-800",
    advanced: "bg-red-100 text-red-800",
    tips: "bg-yellow-100 text-yellow-800",
    announcement: "bg-indigo-100 text-indigo-800",
    cli: "bg-emerald-100 text-emerald-800",
    plugin: "bg-orange-100 text-orange-800",
  };

  return colors[tag as keyof typeof colors] || "bg-gray-100 text-gray-800";
};
