# Utiliser l'image officielle PowerShell de Microsoft
FROM mcr.microsoft.com/powershell:lts-ubuntu-22.04

# Définir le shell pour les commandes RUN
SHELL

# 1. Installer le module Maester (Framework d'audit)
RUN Install-Module -Name Maester -Scope AllUsers -Force -Repository PSGallery

# 2. Installer les dépendances Microsoft Graph
RUN Install-Module -Name Microsoft.Graph.Authentication -Scope AllUsers -Force

# 3. Copier vos scripts d'audit
COPY src/ /app/src/

# 4. Définir le dossier de travail
WORKDIR /app

# 5. Commande de démarrage (Lancer l'audit)
CMD ["pwsh", "-File", "./src/audit.ps1"]
