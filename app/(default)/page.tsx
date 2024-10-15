"use client";

import { useContext, useLayoutEffect } from "react";

import { StatusbarContext } from "./layout";

import Link from "@/components/ViewTransitionLink";

export default function HomePage() {
  const statusbarContext = useContext(StatusbarContext);

  useLayoutEffect(() => {
    statusbarContext.setFilename("root");
  }, []);

  return (
    <section className="flex flex-col items-center justify-center w-full md:h-[90vh]">
      <h1 className="text-4xl mb-8">Astro Vim</h1>
      <div className="text-center">
        <p className="mb-4">version 0.0.1</p>
        <p className="mb-2">
          <Link
            href="https://github.com/albertoperdomo2/astro-vim"
            className="hover:underline"
            target="_blank"
          >
            astro-vim
          </Link>{" "}
          is a free and opensource blog template for tech enthusiasts
        </p>

        <p className="mb-8">
          <Link
            href="https://github.com/luasenvy/nextjs-astro-vim"
            className="hover:underline"
            target="_blank"
          >
            nextjs-astro-vim
          </Link>{" "}
          is fork of astro-vim
        </p>

        <div className="grid md:grid-cols-2 text-left">
          <p>
            type :
            <Link className="hover:underline" href="/about">
              about
            </Link>
            <strong>&crarr;</strong>
          </p>
          <p className="pl-6 md:pl-0">to view about information</p>
        </div>
        <div className="grid md:grid-cols-2 text-left">
          <p>
            type :
            <Link className="hover:underline" href="/blog">
              blog
            </Link>
            <strong>&crarr;</strong>
          </p>
          <p className="pl-6 md:pl-0">to view blog posts</p>
        </div>
        <div className="grid md:grid-cols-2 text-left">
          <p>
            type :
            <Link className="hover:underline" href="/contact">
              contact
            </Link>
            <strong>&crarr;</strong>
          </p>
          <p className="pl-6 md:pl-0">to view contact details</p>
        </div>
        <div className="mb-8 grid md:grid-cols-2 text-left">
          <p>
            type /<strong>&lt;Search term&gt;&crarr;</strong>
          </p>
          <p className="pl-6 md:pl-0">to search posts</p>
        </div>

        <div className="grid md:grid-cols-2 text-left">
          <p>
            type :h<strong>&crarr;</strong>
          </p>
          <p className="pl-6 md:pl-0">
            to view the{" "}
            <Link href="/help" className="hover:underline">
              help
            </Link>{" "}
            page
          </p>
        </div>
        <div className="grid md:grid-cols-2 text-left">
          <p>
            type :q<strong>&crarr;</strong>
          </p>
          <p className="pl-6 md:pl-0">to exit</p>
        </div>
      </div>
    </section>
  );
}
