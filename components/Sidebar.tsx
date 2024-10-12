"use client";

import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

import { StatusbarContext } from "@/app/(default)/layout";

export interface SidebarProps {
  tildeRef?: React.Ref<HTMLDivElement>;
  lineNumbers?: number;
  mode?: "tilde" | "number";
}

export default function Sidebar({ mode, tildeRef, lineNumbers = 1 }: SidebarProps) {
  const pathname = usePathname();
  const isTilde = mode === "tilde";

  const statusbarContext = useContext(StatusbarContext);

  useEffect(() => {
    statusbarContext.setMode("tilde");
  }, [pathname]);

  return (
    <div className="bg-nvim-bg-default text-nvim-placeholder w-6 flex-shrink-0 text-right pr-2">
      <div className="h-full">
        <div ref={tildeRef}>{isTilde ? "~" : 1}</div>

        {lineNumbers > 0 &&
          new Array(lineNumbers - 1)
            .fill(0)
            .map((line, i) => <div key={`line-${i}`}>{isTilde ? "~" : i + 2}</div>)}
      </div>
    </div>
  );
}
