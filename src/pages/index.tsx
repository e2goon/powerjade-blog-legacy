import { NextPage, GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Normal as NormalLayout } from "@/layouts";
import { fetchPosts } from "@/hooks";
import { PostList } from "@/templates/PostList";

const HomePage: NextPage = () => {
  return (
    <NormalLayout>
      <PostList />
    </NormalLayout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("posts", fetchPosts);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
