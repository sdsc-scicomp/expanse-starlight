# Expanse User Guide

An Astro [Starlight](https://starlight.astro.build/) rebuild of the
[SDSC Expanse User Guide](https://www.sdsc.edu/systems/expanse/user_guide.html),
with all original content preserved and reorganized into a searchable docs site
styled with [SDSC branding](https://www.sdsc.edu/about/brand.html) (navy
`#182B49`, gold `#C69214`, Teko + Source Sans 3).

**Live site:** https://sdsc-scicomp.github.io/expanse-starlight/

## Contents

All 14 sections of the original guide, organized by topic:

| Area | Pages |
| --- | --- |
| Overview | Technical Summary |
| Getting Started | System Access, Account Management |
| Software Environment | Modules, Compiling Codes |
| Running Jobs | Job Charging, Running Jobs, Using GPU Nodes |
| Data & Storage | Data Movement, Storage |
| Advanced Resources | Expanse AI Resource, Composable Systems, Software |
| Reference | Citations & Publications |

## Contributing

Every page has an **Edit page** link that opens the source file for editing.
Content fixes are welcome — the source lives in
[`src/content/docs/`](src/content/docs/).

## Development

```bash
npm install
npm run start    # dev server at http://localhost:4321
npm run build    # production build in dist/
npm run preview  # serve the production build locally
```

## Deployment

Pushing to `main` triggers the [deploy workflow](.github/workflows/deploy.yml)
which builds the site and publishes it to the `gh-pages` branch (served by
GitHub Pages). A separate [Lighthouse workflow](.github/workflows/lighthouse.yml)
audits every page for accessibility.

Every pull request automatically gets a temporary preview at
`https://sdsc-scicomp.github.io/expanse-starlight/pr-preview/pr-<number>/`,
posted as a comment on the PR. The preview updates on each push and is removed
when the PR is closed or merged ([preview workflow](.github/workflows/pr-preview.yml)).
