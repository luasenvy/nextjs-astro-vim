"use client";

import "prismjs/themes/prism-tomorrow.css";

import { useParams } from "next/navigation";

import { useContext, useLayoutEffect } from "react";

import { StatusbarContext } from "../../layout";

import posts from "@/lib/data/posts";

export default function BlogViewer() {
  const { slug } = useParams();
  const statusbarContext = useContext(StatusbarContext);

  const post = posts.find(({ metadata }) => metadata.slug === slug);

  useLayoutEffect(() => {
    statusbarContext.setFilename(post?.metadata.title ?? "unknown");
  }, [post]);

  return (
    post && (
      <section className="max-w-none p-10">
        <article className="prose-base">
          <h1>{post.metadata.title}</h1>
          {post.Component && <post.Component />}
        </article>
      </section>
    )
  );
}
