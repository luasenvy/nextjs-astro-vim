import posts from "@/lib/data/posts";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params: { slug } }: Props) {
  const { metadata: { title = "Not Found", description } = {} } =
    posts.find(({ metadata }) => metadata.slug === slug) ?? {};

  return { title, description };
}

export default async function BlogViewerLayout({ children }: React.PropsWithChildren) {
  return children;
}
