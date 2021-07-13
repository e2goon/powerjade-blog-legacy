import { GraphQLClient } from "graphql-request";

// TODO: 리팩토링하기
const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GITHUB_ENDPOINT,
  {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  }
);

export { graphqlClient };
