import { FC } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import prism from "rehype-prism-plus";

interface MarkdownPost {
  content: string;
}

const components = {
  p({ node, children }) {
    const { children: p } = node;
    const { type, tagName, properties } = p[0];
    if (type === "element" && tagName === "img") {
      const { src, alt } = properties;
      return (
        <div className="block text-center my-4 -mx-4 md:-mx-8">
          <a
            href={src}
            className="inline-block outline-none sm:rounded-lg sm:overflow-hidden hover:brightness-110"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              className="mx-auto max-h-96 w-auto"
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

const MarkdownPost: FC<MarkdownPost> = ({ content }) => (
  <ReactMarkdown
    components={components}
    remarkPlugins={[gfm, emoji]}
    rehypePlugins={[prism]}
    className="break-words"
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownPost;
