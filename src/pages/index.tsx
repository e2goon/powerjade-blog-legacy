import { NextPage, GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Normal as Layout } from "~/layouts";
import { fetchPosts } from "~/hooks";
import { PostList } from "~/templates/Post";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <PostList />
    </Layout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("posts", fetchPosts);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
