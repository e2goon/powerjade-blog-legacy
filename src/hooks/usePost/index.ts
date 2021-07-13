import { useQuery } from "react-query";
import { graphqlClient } from "@/utils/client";
import { IssueQuery } from "@/generated/types";
import { issue } from "@/generated/queries";

const fetchPost = async (number: string) => {
  const data: IssueQuery = await graphqlClient.request(issue, {
    number: Number(number),
  });
  const post = data.repository.issue;
  return post;
};

const usePost = (number: string) => {
  return useQuery(["post", number], () => fetchPost(number), {
    enabled: false,
  });
};

export { fetchPost, usePost };
