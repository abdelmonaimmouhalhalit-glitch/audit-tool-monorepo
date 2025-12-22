Write-Host "--- Démarrage du Worker M365 ---"
Write-Host "Vérification de l'installation Maester..."

# Vérifier si Maester est chargé
if (Get-Module -ListAvailable -Name Maester) {
    Write-Host "SUCCESS: Maester est installé."
} else {
    Write-Error "ERROR: Maester est introuvable."
    exit 1
}

Write-Host "Prêt à recevoir les ordres via l'API Gateway."
# Ici viendra la logique pour écouter la queue RabbitMQ/Redis
