import fs from "fs-extra";

import { generateTypes } from "~/generate-types";
import { getCollections } from "~/get-collections";

export type ApiClient = {
  get: <T>(url: string) => Promise<{ data: T }>;
};

export async function generateDirectusSchema(
  url?: string,
  token?: string,
  out = "./directus-schema.ts",
) {
  const baseURL = url ?? process.env.DIRECTUS_API_URL;
  const apiToken = token ?? process.env.DIRECTUS_API_TOKEN;

  if (!baseURL || !apiToken) {
    throw new Error("Please provide a url and token");
  }

  const api: ApiClient = {
    get: async <T>(url: string) => {
      const response = await fetch(`${baseURL}${url}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as T;
    },
  };

  const collections = await getCollections(api);
  if (!collections) {
    throw new Error("No collections found");
  }

  const generatedTypes = generateTypes(collections);
  if (!generatedTypes) {
    throw new Error("No types found");
  }
  await fs.writeFile(out, generatedTypes, "utf-8");
}
