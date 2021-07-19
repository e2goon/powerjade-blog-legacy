import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import ReactMarkdown from "react-markdown";
import { fetchPosts, fetchPost, usePost } from "@/hooks";
import { Normal as Layout } from "@/layouts";
import { format } from "date-fns";
import gfm from "remark-gfm";
import emoji from "remark-emoji";

interface PostProps {
  number: string;
}

const Post: NextPage<PostProps> = ({ number }) => {
  const { data: post, isLoading } = usePost(number);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout title={post.title}>
      <div className="max-w-3xl mx-auto px-4">
        <header className="text-center">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <time className="block mt-4" dateTime={post.createdAt}>
            {format(new Date(post.createdAt), "MMMM dd, yyyy")}
          </time>
        </header>
        <article className="mt-6 prose max-w-none">
          <ReactMarkdown remarkPlugins={[gfm, emoji]}>
            {post.body}
          </ReactMarkdown>
        </article>
      </div>
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
