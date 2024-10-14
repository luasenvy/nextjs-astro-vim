"use client";

import { useContext, useLayoutEffect } from "react";

import { StatusbarContext } from "../layout";

import Link from "@/components/ViewTransitionLink";

export default function ContactPage() {
  const statusbarContext = useContext(StatusbarContext);

  useLayoutEffect(() => {
    statusbarContext.setFilename("contact");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl mb-8">Get in touch!</h1>
      <div className="text-center">
        <p className="mb-4">version 0.0.1</p>

        <p className="mb-2">
          If you have any questions or would like to get in touch, please use the contact
          information below:
        </p>

        <p className="mb-4">
          <Link href="mailto:luas.envy@gmail.com" target="_blank">
            luas.envy@gmail.com
          </Link>
        </p>
      </div>
    </div>
  );
}
