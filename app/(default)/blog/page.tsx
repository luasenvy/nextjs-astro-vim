"use client";

import classnames from "classnames";

import { useRouter } from "next/navigation";
import { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";

import { StatusbarContext } from "../layout";

import Link, { withTransitionTo } from "@/components/ViewTransitionLink";

import posts from "@/lib/data/posts";

export default function BlogPage() {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);

  const [actives, setActives] = useState<Array<boolean>>(
    [true].concat(posts.slice(1).map(() => false))
  );

  const statusbarContext = useContext(StatusbarContext);

  const keymap = useMemo(() => {
    return new Map([
      [
        "j",
        (e: KeyboardEvent) =>
          setActives((prev) => {
            const index = prev.findIndex((active) => active);
            if (index === prev.length - 1) return prev;
            return prev.toSpliced(index, 2, false, true);
          }),
      ],
      [
        "k",
        (e: KeyboardEvent) =>
          setActives((prev) => {
            const index = prev.findIndex((active) => active);
            if (index === 0) return prev;
            return prev.toSpliced(index - 1, 2, true, false);
          }),
      ],
      [
        "Enter",
        () => {
          const index = actives.findIndex((active) => active);
          if (!posts[index]) return;
          withTransitionTo(router, `/blog/${posts[index].metadata.slug}`);
        },
      ],
    ]);
  }, [actives, posts, router]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      try {
        const job = keymap.get(e.key);
        if (!job) throw new Error(`${e.key} command not found`);

        job(e);
      } catch {}
    },
    [keymap]
  );

  useLayoutEffect(() => {
    statusbarContext.setFilename("blog");
  }, []);

  useLayoutEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useLayoutEffect(() => {
    const active = listRef.current?.querySelector<HTMLAnchorElement>(".active");

    if (!active) return;

    const { scrollTop, offsetHeight: viewHeight } = document.documentElement;
    const { offsetTop, offsetHeight } = active;

    const bottomOfScreen = scrollTop + viewHeight - 24; // StatusBar Padding
    const bottomOfElement = offsetTop + offsetHeight;

    if (bottomOfElement > bottomOfScreen)
      return scrollTo({ top: scrollTop + (bottomOfElement - bottomOfScreen) });

    if (offsetTop < scrollTop) return scrollTo({ top: scrollTop - (scrollTop - offsetTop) });
  }, [listRef, actives]);

  return (
    <section>
      <div ref={listRef}>
        {posts.map(({ metadata }, i) => {
          const date = metadata.date ? new Date(metadata.date) : "unknown";
          return (
            <div
              key={`post-${i}`}
              className={classnames(
                "p-2 mb-8 grid lg:grid-cols-[3fr_2fr_1fr] gap-4 items-start hover:bg-nvim-bg-paper/50",
                {
                  [`bg-nvim-bg-paper/50 active`]: actives[i],
                }
              )}
            >
              <p>
                <Link
                  href={`/blog/${metadata.slug}`}
                  className="hover:underline font-semibold post-link"
                >
                  {metadata.title}
                </Link>
              </p>

              <p className="text-sm text-nvim-text-secondary line-clamp-3">{metadata.summary}</p>

              <p className="text-right text-sm text-nvim-text-secondary">
                <time dateTime={date instanceof Date ? date.toISOString() : undefined}>
                  {date instanceof Date
                    ? new Date(date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : date}
                </time>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
