import { useQuery } from "react-query";
import { graphqlClient } from "@/utils/client";
import { IssuesQuery } from "@/generated/types";
import { issues } from "@/generated/queries";

const fetchPosts = async () => {
  const data: IssuesQuery = await graphqlClient.request(issues);
  const posts = data.repository.issues.nodes;
  return posts;
};

const usePosts = () => {
  return useQuery("posts", () => fetchPosts(), { enabled: false });
};

export { fetchPosts, usePosts };
