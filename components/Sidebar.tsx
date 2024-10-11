"use client";

import { usePathname } from "next/navigation";

export interface SidebarProps {
  tildeRef?: React.Ref<HTMLDivElement>;
  lineNumbers?: number;
}

export default function Sidebar({ tildeRef, lineNumbers = 1 }: SidebarProps) {
  const pathname = usePathname();
  const isTildePage = pathname === "/" || pathname.split("/").filter(Boolean).length === 1;

  return (
    <div className="bg-nvim-bg text-nvim-gray w-6 flex-shrink-0 text-right pr-2">
      <div className="h-full">
        <div ref={tildeRef}>{isTildePage ? "~" : 1}</div>

        {lineNumbers > 0 &&
          new Array(lineNumbers - 1)
            .fill(0)
            .map((line, i) => <div key={`line-${i}`}>{isTildePage ? "~" : i + 2}</div>)}
      </div>
    </div>
  );
}
