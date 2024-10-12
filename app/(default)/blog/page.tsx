"use client";

import classnames from "classnames";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";

import { StatusbarContext } from "../layout";

import posts from "@/lib/data/posts";
import styles from "@/styles/blog.module.css";

export default function BlogPage() {
  const listRef = useRef<HTMLUListElement>(null);

  const statusbarContext = useContext(StatusbarContext);

  statusbarContext.setFilename("blog");

  const [actives, setActives] = useState<Array<boolean>>(
    [true].concat(posts.slice(1).map(() => false))
  );

  const keymap = new Map([
    [
      "j",
      () =>
        setActives((prev) => {
          const index = prev.findIndex((active) => active);
          if (index === prev.length - 1) return prev;
          return prev.toSpliced(index, 2, false, true);
        }),
    ],
    [
      "k",
      () =>
        setActives((prev) => {
          const index = prev.findIndex((active) => active);
          if (index === 0) return prev;
          return prev.toSpliced(index - 1, 2, true, false);
        }),
    ],
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
    [
      "Enter",
      () => listRef.current?.querySelector<HTMLAnchorElement>(".active a.post-link")?.click(),
    ],
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

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
    <ul ref={listRef} id="blog-list">
      {posts.map(({ metadata }, i) => (
        <li
          key={`post-${i}`}
          className={classnames("px-2 mb-8 grid lg:grid-cols-[3fr_2fr_1fr] gap-4 items-start", {
            [`${styles["active"]} active`]: actives[i],
          })}
          data-index={i}
          data-href={`/blog/${metadata.slug}`}
        >
          <Link href={`/blog/${metadata.slug}`} className="hover:underline font-semibold post-link">
            {metadata.title}
          </Link>

          <p className="text-sm text-gray-400 line-clamp-3">{metadata.summary}</p>

          <time
            dateTime={new Date(metadata.date).toISOString()}
            className="text-right text-sm text-gray-400"
          >
            {new Date(metadata.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </li>
      ))}
    </ul>
  );
}
