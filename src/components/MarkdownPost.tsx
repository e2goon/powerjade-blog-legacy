import { FC } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import gfm from "remark-gfm";
import emoji from "remark-emoji";

interface MarkdownPost {
  content: string;
}

const components = {
  pre({ node }) {
    const { children: pre } = node;
    const { tagName, properties, children: code } = pre[0];
    if (tagName !== "code") return;
    const { className } = properties;
    const match = /language-(\w+)/.exec(className || "");
    return (
      <SyntaxHighlighter language={match && match[1]} style={atomDark}>
        {String(code[0].value).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
  p({ node, children }) {
    const { children: p } = node;
    const { type, tagName, properties } = p[0];
    if (type === "element" && tagName === "img") {
      const { src, alt } = properties;
      return (
        <a href={src} className="block my-4">
          <Image
            src={src}
            alt={alt}
            width={16}
            height={9}
            layout="responsive"
            className="object-contain"
          />
        </a>
      );
    }
    return <p>{children}</p>;
  },
};

const MarkdownPost: FC<MarkdownPost> = ({ content }) => (
  <ReactMarkdown components={components} remarkPlugins={[gfm, emoji]}>
    {content}
  </ReactMarkdown>
);

export default MarkdownPost;
