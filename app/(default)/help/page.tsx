"use client";

import Link from "next/link";
import { Fragment, useContext, useEffect } from "react";

import { StatusbarContext } from "../layout";

const keymapHelp = new Map<string, Map<string, React.ReactNode>>([
  [
    "Global Keyboard Shortcut",
    new Map<string, React.ReactNode>([
      ["gg", "Scroll to top"],
      ["G", "Scroll to bottom"],
      ["j", "Scroll to down"],
      ["k", "Scroll to up"],
      ["Ctrl + d", "Page Down"],
      ["Ctrl + u", "Page Up"],
    ]),
  ],
  [
    "Global Command",
    new Map<string, React.ReactNode>([
      [
        ":who",
        <>
          Move to <Link href="/about">About</Link> Page
        </>,
      ],
      [
        ":blog",
        <>
          Move to <Link href="/blog">Blog</Link> Page
        </>,
      ],
      [
        ":contact",
        <>
          Move to <Link href="/contact">Contact</Link> Page
        </>,
      ],
      [":set number", "Show Line Numbers"],
      [
        ":h",
        <>
          Move to <Link href="/help">Help</Link> Page
        </>,
      ],
      [":q", "Page Move Back"],
    ]),
  ],
]);

export default function HelpPage() {
  const statusbarContext = useContext(StatusbarContext);

  useEffect(() => {
    statusbarContext.setFilename("HELP");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl mb-8">Help page</h1>
      <div className="text-center">
        <p className="mb-4">version 0.0.1</p>
        <div className="flex flex-col text-left justify-left p-10">
          <p className="mb-8">
            This page contains basic instructions to use this page. Some Vim key bindings are
            enabled and can be used within the page itself, but some of them don't work in all the
            pages since I did not considered it necessary.
          </p>

          {Array.from(keymapHelp.entries()).map(([title, map], i) => (
            <Fragment key={`key-help-${i}`}>
              <h2 className="mt-16 mb-4 text-2xl">{title}</h2>
              {Array.from(map.entries()).map(([key, description], j) => (
                <div key={`key-description-${j}`} className="mb-2 grid md:grid-cols-[1fr_5fr]">
                  <p>
                    <strong>{key}</strong>
                  </p>
                  <p className="pl-4 md:pl-0">{description}</p>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
