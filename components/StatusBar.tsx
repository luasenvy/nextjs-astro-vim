"use client";

import classnames from "classnames";

import { usePathname, useRouter } from "next/navigation";
import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";

import { withTransitionBack, withTransitionTo } from "./ViewTransitionLink";

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
    withTransitionBack(router);
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

    ["home", () => withTransitionTo(router, "/")],
    ["root", () => withTransitionTo(router, "/")],

    ["who", () => withTransitionTo(router, "/about")],
    ["about", () => withTransitionTo(router, "/about")],

    ["blog", () => withTransitionTo(router, "/blog")],
    ["post", () => withTransitionTo(router, "/blog")],
    ["posts", () => withTransitionTo(router, "/blog")],

    ["contact", () => withTransitionTo(router, "/contact")],

    ["h", () => withTransitionTo(router, "/help")],
    ["help", () => withTransitionTo(router, "/help")],

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
      if (e.currentTarget.value.length === 1) toIdleInput();
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
      className={classnames(
        "bg-nvim-bg-paper text-nvim-fg h-6 px-2 flex items-center text-sm gap-4",
        className
      )}
      {...props}
    >
      <p className="flex-grow min-w-20">
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
      </p>
      <p className="max-w-60 truncate" title={filename}>
        {filename}
      </p>
      <p className="flex-shrink-0">1:{lineNumbers}</p>
    </div>
  );
});
