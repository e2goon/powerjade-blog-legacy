import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { format } from "date-fns";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import { fetchPosts, fetchPost, usePost } from "@/hooks";
import { Normal as Layout } from "@/layouts";

interface PostProps {
  number: string;
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
        <div className="my-4">
          <Image
            src={src}
            alt={alt}
            width={16}
            height={9}
            layout="responsive"
            className="object-contain"
          />
        </div>
      );
    }
    return <p>{children}</p>;
  },
};

const Post: NextPage<PostProps> = ({ number }) => {
  const { data: post, isLoading } = usePost(number);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout title={post.title}>
      <article className="max-w-3xl mx-auto px-4">
        <header className="my-10 pb-10 text-center border-b border-gray-200 first:mt-0">
          <h1 className="text-5xl leading-tight font-bold">{post.title}</h1>
          <time className="block mt-4" dateTime={post.createdAt}>
            {format(new Date(post.createdAt), "MMMM dd, yyyy")}
          </time>
        </header>
        <div className="my-10 min-h-[400px] markdown">
          <ReactMarkdown components={components} remarkPlugins={[gfm, emoji]}>
            {post.body}
          </ReactMarkdown>
        </div>
      </article>
    </Layout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts();
  const paths = posts.map((post) => ({
    params: {
      id: String(post.number),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["post", params.id], () =>
    fetchPost(params.id as string)
  );
  return {
    props: {
      number: params.id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
