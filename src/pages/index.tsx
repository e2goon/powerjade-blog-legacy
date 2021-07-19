import { NextPage, GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Normal as Layout } from "@/layouts";
import { fetchPosts } from "@/hooks";
import { PostList } from "@/templates/PostList";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div className="px-4">
        <PostList />
      </div>
    </Layout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("posts", fetchPosts);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
