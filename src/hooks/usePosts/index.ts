import { GraphQLClient } from "graphql-request";
import { useQuery } from "react-query";
import { IssuesQuery } from "@/generated/types";
import { issues } from "@/generated/queries";

// TODO: 리팩토링하기
const client = new GraphQLClient(process.env.NEXT_PUBLIC_GITHUB_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});

const fetchPosts = async () => {
  const data: IssuesQuery = await client.request(issues);
  const posts = data.repository.issues.nodes;
  return posts;
};

const usePosts = () => {
  return useQuery("posts", () => fetchPosts(), { enabled: false });
};

export { fetchPosts, usePosts };
