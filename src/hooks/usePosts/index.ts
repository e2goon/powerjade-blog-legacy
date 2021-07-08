import { GraphQLClient } from "graphql-request";
import { useQuery } from "react-query";
import { RepositoryQuery as RepositoryModel } from "../../generated/types";
import { RepositoryQuery } from "../../generated/queries";

// TODO: 리팩토링하기
const client = new GraphQLClient(process.env.NEXT_PUBLIC_GITHUB_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});

const fetchPosts = async () => {
  const data: RepositoryModel = await client.request(RepositoryQuery);
  const posts = data.repository.issues.nodes;
  return posts;
};

const usePosts = () => {
  return useQuery("posts", () => fetchPosts(), { enabled: false });
};

export { fetchPosts, usePosts };
