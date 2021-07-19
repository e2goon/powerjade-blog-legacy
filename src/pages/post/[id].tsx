import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import ReactMarkdown from "react-markdown";
import { fetchPosts, fetchPost, usePost } from "@/hooks";
import { Normal as NormalLayout } from "@/layouts";

interface PostProps {
  number: string;
}

const Post: NextPage<PostProps> = ({ number }) => {
  const { data: post, isLoading } = usePost(number);

  if (isLoading) return <div>Loading...</div>;

  return (
    <NormalLayout>
      <div className="max-w-3xl mx-auto px-4">
        <h1>{post.title}</h1>
        <time>{post.createdAt}</time>
        <article className="prose">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </article>
      </div>
    </NormalLayout>
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
