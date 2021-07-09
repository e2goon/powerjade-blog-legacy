import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import ReactMarkdown from "react-markdown";
import { fetchPosts, fetchPost, usePost } from "@/hooks";

interface PostProps {
  number: string;
}

const Post: NextPage<PostProps> = ({ number }) => {
  const { data: post, isLoading, error } = usePost(number);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <time>{post.createdAt}</time>
      <article>
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </article>
    </div>
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
