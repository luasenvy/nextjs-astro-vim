"use client";

import debounce from "lodash.debounce";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useRef, useState } from "react";

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

  const keymap = new Map([
    [":", () => statusBarRef.current?.activeStatusInput()],
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
  ]);

  useEffect(() => {
    let count = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      const statusbar = statusBarRef.current;
      if (!statusbar) return;

      try {
        if (e.key === "g") {
          if (++count !== 2) return setTimeout(() => (count = 0), 600);

          count = 0;
          return keymap.get("g")?.();
        }

        const job = keymap.get(e.key);
        if (!job) throw new Error(`${e.key} command not found`);

        job();
      } catch {}
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
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
        setMode: (mode: "tilde" | "number") => setMode(mode),
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
