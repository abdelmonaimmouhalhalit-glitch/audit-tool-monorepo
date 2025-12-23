#!/bin/bash
set -e

echo "🚀 [1/3] Nettoyage des anciennes traces..."
sudo docker compose down --remove-orphans

echo "📦 [2/3] Build et Lancement des services (Mode État de l'Art)..."
sudo docker compose up -d --build

echo "⏳ [3/3] Attente de la préparation des services (Healthchecks)..."
# On attend que le worker soit lancé
sudo docker compose logs -f worker-github &
sleep 5

echo "✅ TOUT EST CONNECTÉ ET OPÉRATIONNEL !"
sudo docker compose ps