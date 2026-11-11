import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import { SITE_URL } from "./config.js";
import { estimateReadingTime } from "./core.js";

const CALLOUTS = ["note", "tip", "warning", "important", "caution"];
const CALLOUT_CLASSES = ["callout", ...CALLOUTS.map((type) => `callout-${type}`)];

/** > [!TIP] ... → <div class="callout callout-tip"> ... */
function rehypeCallouts() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "blockquote") return;

      const firstParagraph = node.children.find(
        (child) => child.type === "element" && child.tagName === "p",
      );
      const firstChild = firstParagraph?.children[0];
      if (!firstParagraph || !firstChild || firstChild.type !== "text") return;

      const match = firstChild.value.match(
        /^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i,
      );
      if (!match) return;

      const type = match[1].toLowerCase();
      firstChild.value = firstChild.value.slice(match[0].length);
      if (firstChild.value === "") firstParagraph.children.shift();

      node.tagName = "div";
      node.properties = { className: ["callout", `callout-${type}`] };
    });
  };
}

/** Collects h2/h3 after rehype-slug for the table of contents. */
function rehypeCollectToc(items) {
  return () => (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id = node.properties?.id;
      if (typeof id === "string") {
        items.push({
          id,
          text: toString(node),
          depth: node.tagName === "h2" ? 2 : 3,
        });
      }
    });
  };
}

/** Safe external links + lazy images. */
function rehypeEnhance() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "a") {
        const href = String(node.properties?.href ?? "");
        if (/^https?:\/\//i.test(href) && !href.startsWith(SITE_URL)) {
          node.properties = {
            ...node.properties,
            target: "_blank",
            rel: ["noopener", "noreferrer"],
          };
        }
      }

      if (node.tagName === "img") {
        node.properties = {
          ...node.properties,
          loading: "lazy",
          decoding: "async",
        };
      }
    });
  };
}

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [
      ...(defaultSchema.attributes?.div ?? []),
      ["className", ...CALLOUT_CLASSES],
    ],
  },
};

export async function renderMarkdown(body, locale) {
  const toc = [];

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype) // Raw HTML is dropped: allowDangerousHtml stays false.
    .use(rehypeCallouts)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeSlug)
    .use(rehypeCollectToc(toc))
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeEnhance)
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark" },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(body);

  return {
    html: String(file),
    toc,
    readingTime: estimateReadingTime(body, locale),
  };
}
