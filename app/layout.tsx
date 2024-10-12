import "@/styles/global.css";

import classnames from "classnames";

import { Ubuntu_Mono as UbuntuMono } from "next/font/google";

export const metadata = {
  title: "Vim",
  description: "Vim Template",
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicon.svg",
    },
  ],
};

const ubuntuMono = UbuntuMono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-ubuntu-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={classnames(
          ubuntuMono.variable,
          "bg-nvim-bg text-amber-500 font-mono flex flex-col h-screen"
        )}
      >
        {children}
      </body>
    </html>
  );
}
