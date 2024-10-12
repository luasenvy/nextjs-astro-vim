"use client";

import classnames from "classnames";

import { usePathname, useRouter } from "next/navigation";
import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";

import { StatusbarContext } from "@/app/(default)/layout";

export interface StatusBarRefProps {
  inputRef: React.Ref<HTMLDivElement>;
  activeStatusInput: () => void;
}

export interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  filename: string;
  lineNumbers: number;
}

export default forwardRef(function StatusBar(
  { filename = "", lineNumbers = 0, className, ...props }: StatusBarProps,
  ref: React.Ref<StatusBarRefProps>
) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string>("NORMAL");
  const [level, setLevel] = useState<"error" | "normal">("normal");
  const [disabled, setDisabled] = useState<boolean>(true);

  const statusbarContext = useContext(StatusbarContext);

  const quit = () => {
    if (pathname === "/") throw new Error("cannot quit from root page");
    router.back();
  };

  const cannotOpen = () => {
    throw new Error("E212: Can't open file for writing");
  };

  const keymap = new Map([
    ["q", quit],
    ["quit", quit],
    ["exit", quit],

    ["w", cannotOpen],
    ["wq", cannotOpen],

    ["home", () => router.push("/")],
    ["root", () => router.push("/")],

    ["who", () => router.push("/about")],
    ["about", () => router.push("/about")],

    ["blog", () => router.push("/blog")],
    ["post", () => router.push("/blog")],
    ["posts", () => router.push("/blog")],

    ["contact", () => router.push("/contact")],

    ["h", () => router.push("/help")],
    ["help", () => router.push("/help")],

    ["set number", () => statusbarContext.setMode("number")],
  ]);

  const toIdleInput = () => {
    setStatus("NORMAL");
    setLevel("normal");
    setDisabled(true);
    inputRef.current?.blur();
  };

  const handleKeyDownStatus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      let cmd = status.slice(1);
      if (cmd.endsWith("!")) cmd = cmd.replace(/[!]+$/g, "");

      try {
        const job = keymap.get(cmd) ?? keymap.get(`${cmd}!`);
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
      toIdleInput();
    } else if (e.key === "Backspace") {
      if (":" === e.currentTarget.value) toIdleInput();
    }
  };

  const handleInputStatus = (e: React.FormEvent<HTMLInputElement>) =>
    setStatus(e.currentTarget.value);

  useImperativeHandle(ref, () => ({
    inputRef,
    activeStatusInput: () => {
      setStatus("");
      setLevel("normal");
      setDisabled(false);
      inputRef.current?.focus();
    },
  }));

  return (
    <div
      id="status-bar"
      className={classnames(
        "bg-nvim-bg-paper text-nvim-fg h-6 px-2 flex items-center text-sm gap-4",
        className
      )}
      {...props}
    >
      <div id="mode" className="flex-grow">
        <input
          ref={inputRef}
          className={classnames("w-full bg-transparent outline-none", {
            "text-nvim-error": level === "error",
          })}
          readOnly={disabled}
          value={status}
          onKeyDown={handleKeyDownStatus}
          onInput={handleInputStatus}
        />
      </div>
      <div id="file-info" className="flex-shrink-0" title={filename}>
        {filename.length > 40 ? filename.slice(0, 40) + "..." : filename}
      </div>
      <div id="position" className="flex-shrink-0">
        1:{lineNumbers}
      </div>
    </div>
  );
});
