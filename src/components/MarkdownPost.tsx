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
        <a href={src} className="block my-4">
          <span className="relative block aspect-video">
            <Image src={src} alt={alt} layout="fill" objectFit="contain" />
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
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownPost;
