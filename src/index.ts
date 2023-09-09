import axios from 'axios';
import { writeFile } from 'fs-extra';

import { generateTypes } from '@/generate-types';
import { getCollections } from '@/get-collections';

export async function generateDirectusSchema(
  url?: string,
  token?: string,
  out = './directus-schema.ts',
) {
  const baseURL = url ?? process.env.DIRECTUS_API_URL;
  const apiToken = token ?? process.env.DIRECTUS_API_TOKEN;

  if (!baseURL || !apiToken) {
    throw new Error('Please provide a url and token');
  }

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });

  const collections = await getCollections(api);
  const types = generateTypes(collections);
  await writeFile(out, types, 'utf-8');
}
