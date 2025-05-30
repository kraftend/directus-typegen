import type { Collection as DirectusCollection, Relation } from "@directus/types";

import type { ApiClient } from "~/index";
import type { Collections, Field } from "~/types";

export async function getCollections(api: ApiClient) {
  const collectionsRes = await api.get<DirectusCollection[]>("/collections?limit=-1");
  const rawCollections = collectionsRes.data;
  const collections: Collections = {};

  for (const collection of rawCollections.sort((a, b) =>
    a.collection.localeCompare(b.collection),
  )) {
    collections[collection.collection] = { ...collection, fields: [] };
  }

  const fieldsRes = await api.get<Field[]>("/fields?limit=-1");
  const fields = fieldsRes.data;

  for (const field of fields.sort((a, b) => a.field.localeCompare(b.field))) {
    if (!collections[field.collection]) {
      console.warn(`${field.collection} not found`);
      continue;
    }
    collections[field.collection]?.fields.push(field);
  }

  for (const key of Object.keys(collections)) {
    if (collections[key]?.fields.length === 0) delete collections[key];
  }

  const relationsRes = await api.get<Relation[]>("/relations?limit=-1");
  const relations = relationsRes.data;

  for (const relation of relations) {
    if (!relation.meta) {
      console.warn(
        `Relation on field '${relation.field}' in collection '${relation.collection}' has no meta. Maybe missing a relation inside directus_relations table.`,
      );
      continue;
    }

    const oneField = collections[relation.meta.one_collection!]?.fields.find(
      (field) => field.field === relation.meta!.one_field,
    );
    const manyField = collections[relation.meta.many_collection]?.fields.find(
      (field) => field.field === relation.meta!.many_field,
    );

    if (oneField)
      oneField.relation = {
        type: "many",
        collection: relation.meta.many_collection,
      };
    if (manyField)
      manyField.relation = {
        type: "one",
        collection: relation.meta.one_collection!,
      };
  }

  return collections;
}
