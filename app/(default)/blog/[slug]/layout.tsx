import { notFound } from "next/navigation";

import posts from "@/lib/data/posts";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params: { slug } }: Props) {
  const post = posts.find(({ metadata }) => metadata.slug === slug);

  if (!post) return notFound();

  const { title, description } = post.metadata;
  return { title, description };
}

export default async function BlogViewerLayout({ children }: React.PropsWithChildren) {
  return children;
}
