import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { QueryClient } from "react-query";
import { fetchPosts, usePosts } from "../hooks";
import { dehydrate } from "react-query/hydration";

const HomePage: NextPage = () => {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("posts", fetchPosts);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
