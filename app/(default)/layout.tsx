"use client";

import debounce from "lodash.debounce";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

import Sidebar from "@/components/Sidebar";
import type { StatusBarRefProps } from "@/components/StatusBar";
import StatusBar from "@/components/StatusBar";

export const StatusbarContext = createContext({
  setMode: (mode: "tilde" | "number") => {},
  setFilename: (filename: string) => {},
});

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  const statusBarRef = useRef<StatusBarRefProps>(null);
  const mainRef = useRef<HTMLElement>(null);
  const tildeRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [mode, setMode] = useState<"tilde" | "number">("tilde");
  const [filename, setFilename] = useState<string>("");

  const [lineNumbers, setLineNumbers] = useState<number>(1);

  const search = (e: KeyboardEvent) => {
    if (document.activeElement !== statusBarRef.current?.inputRef?.current)
      statusBarRef.current?.searchNext(e.shiftKey);
  };

  const keymap = useMemo(
    () =>
      new Map([
        [":", () => statusBarRef.current?.activeStatusInput("command")],
        ["/", () => statusBarRef.current?.activeStatusInput("search")],
        ["n", search],
        ["N", search],
        [
          "g",
          () => {
            scrollTo({ top: 0 });
          },
        ],
        [
          "G",
          () => {
            scrollTo({ top: document.body.scrollHeight });
          },
        ],
        /**
         * `j`, `k` is different action for blog page.
         * in blog page, `j` is next post, `k` is previous post.
         * implemented in @/app/(default)/blog/page.tsx
         *
         * event listener is splitted in each page.
         * so, `e.stopPropagtion()` is not effective.
         * little ugly code but it works.
         */
        ["j", () => pathname !== "/blog" && scrollTo({ top: scrollY + 30 })],
        ["k", () => pathname !== "/blog" && scrollTo({ top: scrollY - 30 })],
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
      ]),
    [pathname]
  );

  let count = 0;
  let doubleTimeout: NodeJS.Timeout | void;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const statusbar = statusBarRef.current;
      if (!statusbar) return;

      try {
        if (e.key === "g") {
          if (++count !== 2) return (doubleTimeout = setTimeout(() => (count = 0), 600));

          count = 0;
          return keymap.get("g")?.(e);
        }

        count = 0;
        if (doubleTimeout) doubleTimeout = clearTimeout(doubleTimeout);

        const job = keymap.get(e.key);
        if (!job) throw new Error(`${e.key} command not found`);

        job(e);
      } catch {}
    },
    [keymap]
  );

  useLayoutEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useLayoutEffect(() => {
    if (!mainRef.current) return;

    const debouncer = debounce(([e]: Array<ResizeObserverEntry>) => {
      const scrollHeight = e.target.scrollHeight ?? 1;
      setLineNumbers(Math.ceil(scrollHeight / (tildeRef.current?.clientHeight ?? scrollHeight)));
    }, 100);

    const observer = new ResizeObserver(debouncer);

    observer.observe(mainRef.current?.firstElementChild as HTMLElement);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <StatusbarContext.Provider
      value={{
        setMode: (mode: "tilde" | "number" = "tilde") => setMode(mode),
        setFilename: (filename: string) => setFilename(filename),
      }}
    >
      <div className="flex">
        <Sidebar tildeRef={tildeRef} lineNumbers={lineNumbers} mode={mode} />
        <main ref={mainRef} className="p-4 mb-6 flex-grow overflow-x-hidden">
          {children}
        </main>
      </div>

      <StatusBar
        ref={statusBarRef}
        className="fixed bottom-0 w-full"
        filename={filename}
        lineNumbers={lineNumbers}
      />
    </StatusbarContext.Provider>
  );
}
