import { GraphQLClient } from "graphql-request";
import { useQuery } from "react-query";
import { IssueQuery } from "@/generated/types";
import { issue } from "@/generated/queries";

// TODO: 리팩토링하기
const client = new GraphQLClient(process.env.NEXT_PUBLIC_GITHUB_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});

const fetchPost = async (number: string) => {
  const data: IssueQuery = await client.request(issue, {
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
