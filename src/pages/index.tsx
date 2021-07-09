import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { fetchPosts, usePosts } from "@/hooks";

const HomePage: NextPage = () => {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.number}`} passHref>
              <a>
                <div>
                  <strong>
                    {post.title} {post.number}
                  </strong>
                  <p>{post.bodyText}</p>
                </div>
              </a>
            </Link>
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
