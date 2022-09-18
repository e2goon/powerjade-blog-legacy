import { NextPage, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Base as Layout } from "~/layouts";
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
  await queryClient.prefetchQuery(["posts"], fetchPosts);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
