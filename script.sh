#!/bin/bash

# Arrêt en cas d'erreur
set -e

echo "=================================================="
echo "PHASE 1 : ASSAINISSEMENT DE L'ESPACE DE TRAVAIL"
echo "=================================================="

# Diagnostic préliminaire
echo "[INFO] Vérification de l'environnement..."
npx nx report

# Reset du cache Nx pour éviter les erreurs "Unable to resolve"
echo "[INFO] Réinitialisation du Daemon Nx..."
npx nx reset

echo "=================================================="
echo "PHASE 2 : GÉNÉRATION DES APPLICATIONS"
echo "=================================================="

# 1. API Gateway
# Note : Usage de guillemets doubles pour les tags pour éviter le split par le shell
echo "[INFO] Génération de l'API Gateway (NestJS)..."
npx nx generate @nx/nest:application \
  --name=api-gateway \
  --directory=apps/api-gateway \
  --projectNameAndRootFormat=as-provided \
  --tags="type:gateway,scope:shared" \
  --linter=eslint \
  --unitTestRunner=jest \
  --e2eTestRunner=jest \
  --skipFormat=false

# 2. Dashboard (React + Vite)
echo "[INFO] Génération du Dashboard (React/Vite)..."
npx nx generate @nx/react:application \
  --name=dashboard \
  --directory=apps/dashboard \
  --projectNameAndRootFormat=as-provided \
  --bundler=vite \
  --style=css \
  --tags="type:ui,scope:admin" \
  --unitTestRunner=vitest \
  --e2eTestRunner=playwright \
  --skipFormat=false

# 3. Worker (NestJS Standalone)
echo "[INFO] Génération du Worker (NestJS)..."
npx nx generate @nx/nest:application \
  --name=worker-notifications \
  --directory=apps/workers/notifications \
  --projectNameAndRootFormat=as-provided \
  --frontendProject=none \
  --tags="type:worker,scope:notifications" \
  --unitTestRunner=jest \
  --skipFormat=false

echo "=================================================="
echo "PHASE 3 : FINALISATION"
echo "=================================================="

echo "[INFO] Génération terminée avec succès."
echo "[INFO] Structure générée :"
ls -R apps/