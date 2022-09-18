import { FC } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import highlight from "rehype-highlight";
import "highlight.js/styles/an-old-hope.css";

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
        <a
          href={src}
          className="block my-4 -mx-4 md:-mx-8 sm:rounded-lg sm:overflow-hidden hover:brightness-110"
        >
          <span className="next-image">
            <Image src={src} alt={alt} layout="fill" />
          </span>
        </a>
      );
    }
    return <p>{children}</p>;
  },
};

const MarkdownPost: FC<MarkdownPost> = ({ content }) => (
  <ReactMarkdown
    components={components}
    remarkPlugins={[gfm, emoji]}
    rehypePlugins={[highlight]}
    className="break-words"
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownPost;
