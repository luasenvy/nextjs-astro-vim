import createMDX from "@next/mdx";

import remarkHeadingId from "remark-heading-id";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkPrism from "remark-prism";

const separator = "\n---\n\n";
function extendsMetadataContent() {
  return (ast, file) => {
    const metadata = ast.children.find(({ type }) => "mdxjsEsm" === type);
    if (!metadata) return;

    const [
      {
        declaration: {
          declarations: [
            {
              init: { properties },
            },
          ],
        },
      },
    ] = metadata.data.estree.body;

    const {
      value: { value: title },
    } = properties.find(({ key }) => "title" === key.value);
    const trimed = file.value.trim();
    const content = trimed.substring(trimed.indexOf(separator, 1) + separator.length);
    const withoutCode = content.replace(/```[^]+?```/g, "");

    properties.push({
      type: "Property",
      method: false,
      shorthand: false,
      computed: false,
      kind: "init",
      key: { type: "Literal", value: "content" },
      value: { type: "Literal", value: content },
    });
    properties.push({
      type: "Property",
      method: false,
      shorthand: false,
      computed: false,
      kind: "init",
      key: { type: "Literal", value: "headings" },
      value: {
        type: "ArrayExpression",
        elements:
          withoutCode.match(/^#[^\n]+/gm)?.map((value) => ({ type: "Literal", value })) ?? [],
      },
    });
    properties.push({
      type: "Property",
      method: false,
      shorthand: false,
      computed: false,
      kind: "init",
      key: { type: "Literal", value: "summary" },
      value: { type: "Literal", value: content.substring(0, 100).concat("...") },
    });

    const hasSlug = properties.some(({ key }) => "slug" === key.value);
    if (!hasSlug) {
      properties.push({
        type: "Property",
        method: false,
        shorthand: false,
        computed: false,
        kind: "init",
        key: { type: "Literal", value: "slug" },
        value: {
          type: "Literal",
          value: encodeURIComponent(title.replace(/[\s]+/g, "-").toLowerCase()),
        },
      });
    }
  };
}

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      [remarkHeadingId, { defaults: true, uniqueDefaults: false }],
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "metadata" }],
      remarkPrism,
      extendsMetadataContent,
    ],
  },
});

export default withMDX(nextConfig);
