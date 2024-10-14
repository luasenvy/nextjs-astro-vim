"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

export type ViewTransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

export function withTransitionBack(router: AppRouterInstance) {
  return new Promise((resolve, reject) => {
    try {
      if (!document.startViewTransition) return resolve(router.back());
      document.startViewTransition(() => router.back());
    } catch (e) {
      reject(e);
    }
  });
}

export async function withTransitionTo(router: AppRouterInstance, href: string = "/") {
  return new Promise((resolve, reject) => {
    try {
      if (!document.startViewTransition) return resolve(router.push(href));
      document.startViewTransition(() => router.push(href));
    } catch (e) {
      reject(e);
    }
  });
}

export default function ViewTransitionLink({
  onClick: handleClick,
  ...props
}: ViewTransitionLinkProps) {
  const router = useRouter();
  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleClick?.(e);

    const { target, href } = e.currentTarget;
    if (target !== "_blank") {
      e.preventDefault();
      withTransitionTo(router, href);
    }
  };

  return <Link {...props} onClick={handleTransition} />;
}
