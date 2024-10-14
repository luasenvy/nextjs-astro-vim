"use client";

import { useContext, useLayoutEffect } from "react";

import { StatusbarContext } from "../layout";

export default function AboutPage() {
  const statusbarContext = useContext(StatusbarContext);

  useLayoutEffect(() => {
    statusbarContext.setFilename("about");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl mb-8">About</h1>
      <div className="text-center">
        <p className="mb-4">version 0.0.1</p>
        <div className="flex flex-col text-left justify-left p-10">
          <p className="p-4">
            Welcome to our Astro template landing page, inspired by the legendary Vim console. This
            template is designed for developers who understand that Vim is not just a text editor,
            but a way of life.
          </p>
          <p className="p-4">
            Our landing page harnesses the power of Vim’s efficient and minimalist design, bringing
            the speed and functionality of the console to the web. With support for key bindings,
            you can navigate and interact with the page just as you would in your favorite editor.
          </p>
          <p className="p-4">
            <a className="italic">Why Vim?</a>
            Vim is renowned for its unparalleled efficiency and control, allowing developers to
            perform complex text manipulations with just a few keystrokes. It's a tool that, once
            mastered, transforms the coding experience, making it faster and more enjoyable.
          </p>
          <p className="p-4">
            Experience the future of landing pages with our Vim-inspired design, where every
            interaction is swift, intuitive, and satisfying. Whether you're a seasoned Vim user or
            new to this powerful editor, our template will enhance your web development process,
            making every moment on your site as productive as possible.
          </p>
          <p className="p-4">
            Join us on this journey to redefine web navigation and interaction with the timeless
            efficiency of Vim. Embrace the best text editor’s philosophy and see how it
            revolutionizes the way you build and use web pages. Welcome to a new era of web
            development with the Astro.build Vim-inspired landing page.
          </p>
        </div>
      </div>
    </div>
  );
}
