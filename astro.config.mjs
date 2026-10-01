// @ts-check
// `npm run dev` — dev server
// `npm run build` — production build into `dist/`
// `npm run preview` — serve the production build locally

import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import { visit } from "unist-util-visit";

// PR preview builds serve the site under /expanse-starlight/pr-preview/pr-<number>/,
// so the base URL is overridable at build time (see .github/workflows/pr-preview.yml).
const base = process.env.BASE_URL || "/expanse-starlight/";

/**
 * Prefix absolute root-relative markdown links (e.g. /modules) with the
 * deployment base URL, so links keep working when the site is served from a
 * subpath (GitHub Pages or PR previews), mirroring Docusaurus behaviour.
 */
const rehypeBaseLinks = () => (tree) => {
  visit(tree, (node) => {
    if (
      node.type === "element" &&
      node.tagName === "a" &&
      typeof node.properties?.href === "string"
    ) {
      const href = node.properties.href;
      if (
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith(base)
      ) {
        node.properties.href = base + href.slice(1);
      }
    }
  });
};

/**
 * Wrap markdown tables in a scrollable div so wide tables scroll
 * horizontally instead of overflowing the page (keeps native table
 * semantics for screen readers).
 */
const rehypeWrapTables = () => (tree) => {
  visit(tree, (node, index, parent) => {
    if (
      node.type === "element" &&
      node.tagName === "table" &&
      parent &&
      !(
        parent.type === "element" &&
        parent.tagName === "div" &&
        parent.properties?.className?.includes("table-wrapper")
      )
    ) {
      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { className: ["table-wrapper"] },
        children: [node],
      };
    }
  });
};

export default defineConfig({
  site: "https://sdsc-scicomp.github.io",
  base,

  integrations: [
    starlight({
      title: "Expanse User Guide",
      description:
        "Documentation for the Expanse supercomputer at SDSC",
      logo: {
        light: "./src/assets/sdsc-logo.svg",
        dark: "./src/assets/sdsc-logo-white.svg",
      },
      favicon: "/favicon.svg",
      editLink: {
        baseUrl: "https://github.com/sdsc-scicomp/expanse-starlight/edit/main/",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/sdsc-scicomp/expanse-starlight",
        },
      ],
      sidebar: [
        { label: "Technical Summary", link: "/" },
        {
          label: "Getting Started",
          items: ["system-access", "account-management"],
        },
        {
          label: "Software Environment",
          items: ["modules", "compiling"],
        },
        {
          label: "Running Jobs",
          items: ["job-charging", "running-jobs", "gpu-nodes"],
        },
        {
          label: "Data & Storage",
          items: ["data-movement", "storage"],
        },
        {
          label: "Advanced Resources",
          items: ["expanse-ai", "composable-systems", "software"],
        },
        "citations",
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      customCss: ["./src/styles/custom.css"],
      components: {
        Footer: "./src/components/Footer.astro",
      },
    }),
  ],

  markdown: {
    processor: unified({ rehypePlugins: [rehypeWrapTables, rehypeBaseLinks] }),
  },
});
