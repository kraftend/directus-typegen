import type { Collections, Field } from "./types";

export function generateTypes(collections: Collections, useIntersectionTypes = false) {
  let ret = "// This file is auto-generated. Do not edit.\n\n";
  const types: string[] = [];

  for (const collection of Object.values(collections)) {
    const collectionName = collection.collection;
    const typeName = pascalCase(collectionName);
    types.push(
      !collection.meta?.singleton
        ? `${collectionName}: ${typeName}[]`
        : `${collectionName}: ${typeName}`,
    );
    ret += `export interface ${typeName} {\n`;
    for (const field of collection.fields) {
      if (field.meta?.interface?.startsWith("presentation-")) continue;
      ret += "  ";
      ret += field.field.includes("-") ? `"${field.field}"` : field.field;
      if (field.schema?.is_nullable) ret += "?";
      ret += ": ";
      ret += getType(field, useIntersectionTypes);
      ret += ";\n";
    }
    ret += "};\n\n";
  }

  ret += `export interface Schema {\n${types.map((x) => `  ${x};`).join("\n")}\n};`;

  ret += "\n";

  console.log("ret:", ret);

  return ret;
}

function pascalCase(str: string) {
  return str
    .split(" ")
    .flatMap((x) => x.split("_"))
    .flatMap((y) => y.split("-"))
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join("");
}

function getType(field: Field, useIntersectionTypes = false) {
  let type: string;
  if (field.relation && field.relation.type === "many") {
    type = "any[]";
  } else {
    if (["integer", "bigInteger", "float", "decimal"].includes(field.type)) type = "number";
    else if (["boolean"].includes(field.type)) type = "boolean";
    else if (["json", "csv"].includes(field.type)) type = "unknown";
    else type = "string";
  }
  if (field.relation) {
    type += useIntersectionTypes ? " & " : " | ";
    type += field.relation.collection ? pascalCase(field.relation.collection) : "any";
    if (field.relation.type === "many") type += "[]";
  }
  if (field.schema?.is_nullable) {
    if (field.relation && useIntersectionTypes) {
      type = `(${type}) | null`;
    } else {
      type += " | null";
    }
  }
  return type;
}
