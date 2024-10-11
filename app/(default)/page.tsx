import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-48">
      <h1 className="text-4xl font-bold mb-8 text-nvim-blue">Astro Vim</h1>
      <div className="text-center">
        <p className="mb-4">version 0.0.1</p>
        <p className="mb-2">
          <Link
            href="https://github.com/albertoperdomo2/astro-vim"
            className="mb-4 hover:underline"
            target="_blank"
          >
            astro-vim
          </Link>{" "}
          is a free and opensource blog template for tech enthusiasts
        </p>

        <p className="mb-2">
          <Link
            href="https://github.com/luasenvy/nextjs-astro-vim"
            className="mb-4 hover:underline"
            target="_blank"
          >
            nextjs-astro-vim
          </Link>{" "}
          is fork of astro-vim
        </p>
        <div className="p-8 text-nvim-green text-left">
          <p>
            type :
            <Link className="underline" href="/about">
              about
            </Link>
            <span className="text-nvim-blue">&lt;Enter&gt;</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to view about
            information
          </p>
          <p>
            type :
            <Link className="underline" href="/blog">
              blog
            </Link>
            <span className="text-nvim-blue">&lt;Enter&gt;</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to view
            blog posts
          </p>
          <p>
            type :
            <Link className="underline" href="/contact">
              contact
            </Link>
            <span className="text-nvim-blue">&lt;Enter&gt;</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to view contact details
          </p>
          <br />
          <p>
            type /<span className="text-nvim-blue">&lt;Search term&gt;</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to search posts
          </p>
          <br />
          <p>
            type :h<span className="text-nvim-blue">&lt;Enter&gt;</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to
            view the{" "}
            <a href="/help" className="underline text-nvim-blue hover:text-blue-800">
              help
            </a>{" "}
            page
          </p>
          <p>
            type :q<span className="text-nvim-blue">&lt;Enter&gt;</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to
            exit
          </p>
        </div>
      </div>
    </div>
  );
}
