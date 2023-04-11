import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: {
    [`${process.env.NEXT_PUBLIC_GITHUB_ENDPOINT}`]: {
      headers: {
        "User-Agent": "powerjade",
        Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    },
  },
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
    "src/generated/queries.ts": {
      plugins: ["typescript-document-nodes"],
      config: {
        gqlImport: "graphql-request#gql",
        namingConvention: "change-case-all#camelCase",
      },
    },
  },
};

export default config;
