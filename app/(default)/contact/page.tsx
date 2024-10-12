"use client";

import Link from "next/link";
import { useContext } from "react";

import { StatusbarContext } from "../layout";

export default function ContactPage() {
  const statusbarContext = useContext(StatusbarContext);

  statusbarContext.setFilename("contact");

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-8">Get in touch!</h1>
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
