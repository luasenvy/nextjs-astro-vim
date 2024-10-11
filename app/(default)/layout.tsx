"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Sidebar from "@/components/Sidebar";
import type { StatusBarRefProps } from "@/components/StatusBar";
import StatusBar from "@/components/StatusBar";

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  const statusBarRef = useRef<StatusBarRefProps>(null);
  const mainRef = useRef<HTMLElement>(null);
  const tildeRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [lineNumbers, setLineNumbers] = useState<number>(1);

  const keymap = new Map([
    [":", () => statusBarRef.current?.activeStatusInput()],
    [
      "G",
      () => {
        scrollTo({ top: document.body.scrollHeight });
      },
    ],
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const statusbar = statusBarRef.current;
      if (!statusbar) return;

      try {
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

    const scrollHeight = mainRef.current.firstElementChild?.scrollHeight ?? 1;
    setLineNumbers(Math.ceil(scrollHeight / (tildeRef.current?.clientHeight ?? scrollHeight)));
  }, [pathname]);

  return (
    <>
      <div className="flex">
        <Sidebar tildeRef={tildeRef} lineNumbers={lineNumbers} />
        <main ref={mainRef} className="p-4 mb-6 flex-grow">
          {children}
        </main>
      </div>

      <StatusBar ref={statusBarRef} className="fixed bottom-0 w-full" />
    </>
  );
}
