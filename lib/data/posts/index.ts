import Post1, { metadata as metadata1 } from "./post-1/index.mdx";
import Post2, { metadata as metadata2 } from "./post-2/index.mdx";
import Post3, { metadata as metadata3 } from "./post-3/index.mdx";
import Post4, { metadata as metadata4 } from "./post-4/index.mdx";
import Post5, { metadata as metadata5 } from "./post-5/index.mdx";
import Post6, { metadata as metadata6 } from "./post-6/index.mdx";
import Post7, { metadata as metadata7 } from "./post-7/index.mdx";

const posts = [
  { Component: Post1, metadata: metadata1 },
  { Component: Post2, metadata: metadata2 },
  { Component: Post3, metadata: metadata3 },
  { Component: Post4, metadata: metadata4 },
  { Component: Post5, metadata: metadata5 },
  { Component: Post6, metadata: metadata6 },
  { Component: Post7, metadata: metadata7 },
]
  .filter(({ metadata: { draft } }) => !draft)
  .sort(
    ({ metadata: { date: a } }, { metadata: { date: b } }) =>
      new Date(b).getTime() - new Date(a).getTime()
  );

export type PostItem = (typeof posts)[number];

export default posts;
