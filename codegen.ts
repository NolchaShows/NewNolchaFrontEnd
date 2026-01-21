import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema:
    process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT ??
    "https://new-nolcha-strapi.onrender.com/graphql",
  documents: ["src/lib/graphql/queries/**/*.{ts,tsx,graphql,gql}"],
  generates: {
    "./src/lib/graphql/__generated__/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;

