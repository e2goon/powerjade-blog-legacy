import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface NormalLayoutProps {}

const NormalLayout: FC<NormalLayoutProps> = ({ children }) => {
  return (
    <div>
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
      <footer className="mx-auto max-w-3xl py-8 text-gray-600 text-center text-xs">
        &copy;{" "}
        <a href="https://github.com/e2goon" className="text-blue-600 font-bold">
          powerjade
        </a>
        . Made with{" "}
        <a href="https://nextjs.org/" className="text-blue-600 font-bold">
          Next.js
        </a>
      </footer>
    </div>
  );
};

export default NormalLayout;
