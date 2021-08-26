import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

interface NormalLayoutProps {
  title?: string;
}

const NormalLayout: FC<NormalLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " · powerjade" : "powerjade"}</title>
      </Head>
      <header className="mx-auto max-w-3xl py-12">
        <Link href="/" passHref>
          <a className="block mx-auto rounded-full w-16 h-16 overflow-hidden">
            <Image
              src="https://avatars.githubusercontent.com/u/45934?s=200&v=4"
              alt="powerjade"
              width={200}
              height={200}
            />
          </a>
        </Link>
      </header>
      <main>{children}</main>
      <footer className="mx-auto max-w-3xl py-10 text-gray-600 text-center text-xs">
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
          className="text-blue-600 font-bold"
        >
          Github Issue
        </a>
      </footer>
    </>
  );
};

export default NormalLayout;
