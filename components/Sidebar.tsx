"use client";

import { usePathname } from "next/navigation";
import { useContext, useLayoutEffect } from "react";

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

  useLayoutEffect(() => {
    statusbarContext.setMode("tilde");
  }, [pathname]);

  return (
    <div className="bg-nvim-bg-default text-nvim-placeholder w-6 flex-shrink-0 text-right pr-2">
      <div className="h-full">
        <p ref={tildeRef}>{isTilde ? "~" : 1}</p>

        {lineNumbers > 0 &&
          new Array(lineNumbers - 1)
            .fill(0)
            .map((line, i) => <p key={`line-${i}`}>{isTilde ? "~" : i + 2}</p>)}
      </div>
    </div>
  );
}
