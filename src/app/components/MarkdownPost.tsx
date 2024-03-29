import "prism-themes/themes/prism-vsc-dark-plus.css";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import prism from "rehype-prism-plus";
import emoji from "remark-emoji";
import gfm from "remark-gfm";

const components = {
  p({ node, children }) {
    const { children: p } = node;
    const { type, tagName, properties } = p[0];
    if (type === "element" && tagName === "img") {
      const { src, alt } = properties;
      return (
        <div className="block my-4 -mx-4 text-center md:-mx-8">
          <a
            href={src}
            className="inline-block outline-none sm:rounded-lg sm:overflow-hidden hover:brightness-110"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              className="w-auto mx-auto max-h-96"
              width={720}
              height={720}
              src={src}
              alt={alt}
            />
          </a>
        </div>
      );
    }
    return <p>{children}</p>;
  },
};

const MarkdownPost = ({ content }: MarkdownPostProps) => (
  <ReactMarkdown
    components={components}
    remarkPlugins={[gfm, emoji]}
    rehypePlugins={[prism]}
    className="markdown"
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownPost;

type MarkdownPostProps = {
  content: string;
};
