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
        <a
          href={src}
          className="max-h-96 block my-4 -mx-4 md:-mx-8 outline-none sm:rounded-lg sm:overflow-hidden hover:brightness-110"
          target="_blank"
          rel="noreferrer"
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
    rehypePlugins={[prism]}
    className="break-words"
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownPost;
