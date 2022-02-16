import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { format } from "date-fns";
import { fetchPosts, fetchPost, usePost } from "~/hooks";
import { Normal as Layout } from "~/layouts";
import MarkdownPost from "~/components/MarkdownPost";

interface PostProps {
  number: string;
}

const Post: NextPage<PostProps> = ({ number }) => {
  const { data: post, isLoading } = usePost(number);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout title={post.title}>
      <article className="max-w-3xl mx-auto px-4">
        <header className="my-10 pb-10 text-center border-b border-gray-200 first:mt-0">
          <h1 className="text-2xl font-bold md:text-5xl !leading-normal">
            {post.title}
          </h1>
          <time className="block mt-2 text-gray-600" dateTime={post.createdAt}>
            {format(new Date(post.createdAt), "MMMM dd, yyyy")}
          </time>
        </header>
        <div className="my-10 min-h-[400px] markdown">
          <MarkdownPost content={post.body} />
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
