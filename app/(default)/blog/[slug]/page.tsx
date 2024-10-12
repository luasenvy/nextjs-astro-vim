"use client";

import "prismjs/themes/prism-tomorrow.css";

import { useParams } from "next/navigation";

import { useContext, useEffect } from "react";

import { StatusbarContext } from "../../layout";

import posts from "@/lib/data/posts";

export default function BlogViewer() {
  const { slug } = useParams();
  const statusbarContext = useContext(StatusbarContext);

  const post = posts.find(({ metadata }) => metadata.slug === slug);

  useEffect(() => {
    statusbarContext.setFilename(post?.metadata.title ?? "unknown");
  }, [post]);

  const keymap = new Map([
    ["j", () => scrollTo({ top: scrollY + 30 })],
    ["k", () => scrollTo({ top: scrollY - 30 })],
    [
      "d",
      (e: KeyboardEvent) => {
        if (!e.ctrlKey) return;
        e.preventDefault();

        scrollTo({ top: scrollY + window.innerHeight });
      },
    ],
    [
      "u",
      (e: KeyboardEvent) => {
        if (!e.ctrlKey) return;
        e.preventDefault();

        scrollTo({ top: scrollY - window.innerHeight });
      },
    ],
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      try {
        const job = keymap.get(e.key);
        if (!job) throw new Error(`${e.key} command not found`);

        job(e);
      } catch {}
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    post && (
      <article className="prose-base max-w-none p-10">
        <h1>{post.metadata.title}</h1>
        {post.Component && <post.Component />}
      </article>
    )
  );
}
