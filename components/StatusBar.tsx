"use client";

import classnames from "classnames";

import { usePathname, useRouter } from "next/navigation";
import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";

import { withTransitionBack, withTransitionTo } from "./ViewTransitionLink";

import { StatusbarContext } from "@/app/(default)/layout";

type Mode = "search" | "command";

export interface StatusBarRefProps {
  inputRef: React.RefObject<HTMLInputElement>;
  activeStatusInput: (m: Mode) => void;
  searchNext: (backward?: boolean) => void;
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
  const [mode, setMode] = useState<Mode>("command");
  const [keyword, setKeyword] = useState<string>("");
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

  const search = (_keyword: string) => {
    setKeyword(_keyword);

    /**
     * search next is not reusing keyword.
     * because, keyword is possible to not change when search first.
     * so, use _keyword for search next.
     */
    // @ts-expect-error: native API for window
    window.find(_keyword ?? keyword, false, false, true);
  };

  const searchNext = (backward: boolean = false) => {
    // @ts-expect-error: native API for window
    window.find(keyword, false, backward, true);
  };

  const handleKeyDownStatus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      let cmd = status.slice(1);

      try {
        let job;
        if (mode === "command") {
          if (cmd.endsWith("!")) cmd = cmd.replace(/[!]+$/g, "");

          job = keymap.get(cmd) ?? keymap.get(`${cmd}!`);
          if (!job) throw new Error(`${cmd} command not found`);
          job();
        } else {
          search(cmd);
        }

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
    activeStatusInput: (mode: Mode) => {
      setStatus("");
      setLevel("normal");
      setMode(mode);
      setDisabled(false);
      inputRef.current?.focus();
    },
    searchNext,
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
