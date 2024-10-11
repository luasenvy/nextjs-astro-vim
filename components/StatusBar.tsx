"use client";

import classnames from "classnames";

import { usePathname, useRouter } from "next/navigation";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface StatusBarRefProps {
  inputRef: React.Ref<HTMLDivElement>;
  activeStatusInput: () => void;
}

export default forwardRef(function StatusBar(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.Ref<StatusBarRefProps>
) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string>("NORMAL");
  const [level, setLevel] = useState<"error" | "normal">("normal");
  const [disabled, setDisabled] = useState<boolean>(true);

  const keymap = new Map([
    [
      "q",
      () => {
        if (pathname === "/") throw new Error("cannot quite from this page");
        router.back();
      },
    ],
    ["who", () => router.push("/about")],
    ["about", () => router.push("/about")],
    ["blog", () => router.push("/blog")],
    ["contact", () => router.push("/contact")],
    ["h", () => router.push("/help")],
    ["help", () => router.push("/help")],
  ]);

  const handleKeyDownStatus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const cmd = status.slice(1);
      try {
        const job = keymap.get(cmd);
        if (!job) throw new Error(`${cmd} command not found`);

        job();

        setStatus("NORMAL");
        setLevel("normal");
      } catch (err) {
        setStatus(`${(err as Error).message}`);
        setLevel("error");
      } finally {
        setDisabled(true);
        inputRef.current?.blur();
      }
    } else if (e.key === "Escape") {
      setStatus("NORMAL");
      setLevel("normal");
      setDisabled(true);
      inputRef.current?.blur();
    }
  };

  const handleInputStatus = (e: React.FormEvent<HTMLInputElement>) =>
    setStatus(e.currentTarget.value);

  useImperativeHandle(ref, () => ({
    inputRef,
    activeStatusInput: () => {
      setStatus("");
      setDisabled(false);
      inputRef.current?.focus();
    },
  }));

  return (
    <div
      id="status-bar"
      className={classnames(
        "bg-nvim-statusline text-nvim-fg h-6 px-2 flex items-center text-sm gap-4",
        className
      )}
      {...props}
    >
      <div id="mode" className="flex-grow">
        <input
          ref={inputRef}
          className={classnames("w-full bg-transparent outline-none", {
            "text-red-500": level === "error",
          })}
          readOnly={disabled}
          value={status}
          onKeyDown={handleKeyDownStatus}
          onInput={handleInputStatus}
        />
      </div>
      <div id="file-info" className="flex-shrink-0">
        Landing Page
      </div>
      <div id="position" className="flex-shrink-0">
        1:1
      </div>
    </div>
  );
});
