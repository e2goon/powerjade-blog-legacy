import { useQuery } from "react-query";
import { graphqlClient } from "~/utils/client";
import { IssuesQuery } from "~/generated/types";
import { issues } from "~/generated/queries";

const fetchPosts = async () => {
  const data: IssuesQuery = await graphqlClient.request(issues, {
    owner: process.env.NEXT_PUBLIC_GITHUB_OWNER,
    name: process.env.NEXT_PUBLIC_GITHUB_NAME,
    label: process.env.NODE_ENV === "production" ? "published" : "post",
  });
  const posts = data.repository.issues.nodes;
  return posts;
};

const usePosts = () => {
  return useQuery("posts", () => fetchPosts(), { enabled: false });
};

export { fetchPosts, usePosts };
