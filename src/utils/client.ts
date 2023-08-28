import { GraphQLClient } from "graphql-request";

import { getSdk } from "~/generated/types";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GITHUB_ENDPOINT as string,
  {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  },
);

const github = getSdk(client);

export { github };
