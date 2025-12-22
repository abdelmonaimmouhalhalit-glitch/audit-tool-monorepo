#!/bin/bash

# 1. Nettoyer l'ancien client pour éviter les conflits
rm -rf libs/api-client/src/*

# 2. Générer le nouveau client TypeScript (avec Axios)
# FIX: Ajout de apiPackage et modelPackage obligatoires
npx openapi-generator-cli generate \
  -i apps/api-gateway/openapi.yaml \
  -g typescript-axios \
  -o libs/api-client/src \
  --additional-properties=npmName=@audit-tool-monorepo/api-client,supportsES6=true,withSeparateModelsAndApi=true,apiPackage=api,modelPackage=models

# 3. Créer un index.ts propre pour exporter le tout (Nx en a besoin)
echo "export * from './api';" >> libs/api-client/src/index.ts
echo "export * from './configuration';" >> libs/api-client/src/index.ts