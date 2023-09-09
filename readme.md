# @kraftend/directus-typegen

This is a [Directus](https://directus.io/) helper that generates types for your instance.

## How to install
```
pnpm install @kraftend/directus-typegen
```

## How to use
```
pnpm run directus-typegen --url https://directus.example.com --token <token> --output ./directus-schema.ts
```

All of the options are optional. Url and token can also be set via environment variables:
```
DIRECTUS_API_URL="https://directus.example.com"
DIRETUS_API_TOKEN="super-secret-token"
```

## Thanks
Initial code was taken from [maltejur/directus-extension-generate-types](https://github.com/maltejur/directus-extension-generate-types).

However adding extension to the directus itself and copying types every time you update directus is not very convenient. So I decided to make it a separate package to run from cli in the projects where Directus api is used.
