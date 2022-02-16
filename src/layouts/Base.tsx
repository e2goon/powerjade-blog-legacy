import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

interface BaseLayoutProps {
  title?: string;
}

const BaseLayout: FC<BaseLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " · powerjade" : "powerjade"}</title>
      </Head>

      <header className="sticky top-0 py-8 after:absolute after:inset-0 after:bg-white dark:after:bg-black after:gradient-mask-b-40">
        <Link href="/" passHref>
          <a className="relative block mx-auto rounded-full w-16 h-16 overflow-hidden outline-none transition hover:ring-4 focus:ring-4 hover:ring-zinc-300 focus:ring-zinc-300 dark:hover:ring-zinc-700 dark:focus:ring-zinc-700 z-10">
            <Image
              src="https://avatars.githubusercontent.com/u/45934?s=200&v=4"
              alt="powerjade"
              width={200}
              height={200}
            />
          </a>
        </Link>
      </header>

      <main className="mx-auto max-w-2xl">{children}</main>

      <footer className="py-10 text-zinc-600 text-center text-xs">
        &copy;{" "}
        <a href="https://github.com/e2goon" className="text-blue-600 font-bold">
          powerjade
        </a>
        . Made with{" "}
        <a href="https://nextjs.org/" className="text-blue-600 font-bold">
          Next.js
        </a>{" "}
        &middot;{" "}
        <a
          href="https://github.com/e2goon/powerjade/issues"
          className="text-blue-600 font-bold dark:text-blue-500"
        >
          Github Issue
        </a>
      </footer>
    </>
  );
};

export default BaseLayout;
