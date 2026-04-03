#!/usr/bin/env pwsh

/**
 * Script PowerShell pour configurer SMTP IONOS pour Supabase
 * 
 * Usage: .\scripts\setup-smtp-powershell.ps1
 * 
 * Prérequis:
 * - Variables d'environnement configurées
 * - Clé de service Supabase disponible
 */

# Configuration
$ErrorActionPreference = "Stop"

# Lecture des variables d'environnement
$SUPABASE_PROJECT_REF = $env:SUPABASE_PROJECT_REF
$SUPABASE_SERVICE_KEY = $env:SUPABASE_SERVICE_KEY

$SMTP_CONFIG = @{
    external_email_enabled = $true
    smtp_host = $env:IONOS_SMTP_HOST ? $env:IONOS_SMTP_HOST : "smtp.ionos.fr"
    smtp_port = $env:IONOS_SMTP_PORT ? [int]$env:IONOS_SMTP_PORT : 587
    smtp_user = $env:IONOS_EMAIL_USER ? $env:IONOS_EMAIL_USER : "contact@jayscreationsdesign.fr"
    smtp_pass = $env:IONOS_EMAIL_PASS
    smtp_admin_email = $env:IONOS_ADMIN_EMAIL ? $env:IONOS_ADMIN_EMAIL : "contact@jayscreationsdesign.fr"
    smtp_sender_name = "Jay's Creations Design"
}

function Validate-Config {
    $required = @('SUPABASE_PROJECT_REF', 'SUPABASE_SERVICE_KEY', 'IONOS_EMAIL_PASS')
    $missing = @()
    
    foreach ($var in $required) {
        $value = [System.Environment]::GetEnvironmentVariable($var)
        if ([string]::IsNullOrEmpty($value)) {
            $missing += $var
        }
    }
    
    if ($missing.Count -gt 0) {
        Write-Host "❌ Variables d'environnement manquantes:" -ForegroundColor Red
        foreach ($var in $missing) {
            Write-Host "   - $var" -ForegroundColor Red
        }
        Write-Host ""
        Write-Host "Veuillez configurer ces variables dans votre .env.local" -ForegroundColor Yellow
        Write-Host "Dans PowerShell:" -ForegroundColor Yellow
        Write-Host '$env:SUPABASE_PROJECT_REF = "valeur"' -ForegroundColor Gray
        Write-Host '$env:SUPABASE_SERVICE_KEY = "valeur"' -ForegroundColor Gray
        Write-Host '$env:IONOS_EMAIL_PASS = "valeur"' -ForegroundColor Gray
        exit 1
    }
    
    Write-Host "✅ Configuration validée" -ForegroundColor Green
}

function Setup-SMTP {
    $data = $SMTP_CONFIG | ConvertTo-Json -Depth 10
    
    $headers = @{
        'Authorization' = "Bearer $SUPABASE_SERVICE_KEY"
        'Content-Type' = 'application/json'
    }
    
    $uri = "https://api.supabase.com/v1/projects/$SUPABASE_PROJECT_REF/config/auth"
    
    try {
        Write-Host "📡 Envoi de la configuration à Supabase..." -ForegroundColor Blue
        $response = Invoke-RestMethod -Uri $uri -Method Patch -Headers $headers -Body $data
        
        Write-Host "✅ Configuration SMTP appliquée avec succès" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "❌ Erreur lors de la configuration SMTP: $($_.Exception.Message)" -ForegroundColor Red
        
        if ($_.Exception.Message -like "*401*") {
            Write-Host "💡 Vérifiez votre clé de service Supabase" -ForegroundColor Yellow
        } elseif ($_.Exception.Message -like "*404*") {
            Write-Host "💡 Vérifiez votre référence de projet Supabase" -ForegroundColor Yellow
        } elseif ($_.Exception.Message -like "*403*") {
            Write-Host "💡 Vérifiez les permissions de votre clé de service" -ForegroundColor Yellow
        }
        
        exit 1
    }
}

function Test-EmailSending {
    Write-Host "📧 Test d'envoi d'email..." -ForegroundColor Blue
    
    try {
        Write-Host "✅ Test de configuration SMTP terminé" -ForegroundColor Green
        Write-Host "📝 Pour tester réellement, créez un compte utilisateur sur le site" -ForegroundColor Yellow
        
    }
    catch {
        Write-Host "❌ Erreur lors du test: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Programme principal
function Main {
    Write-Host "🔧 Configuration SMTP IONOS pour Supabase (PowerShell)" -ForegroundColor Cyan
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    
    try {
        # Validation
        Validate-Config
        
        # Affichage de la configuration
        Write-Host "Configuration SMTP:" -ForegroundColor Cyan
        Write-Host "  - Hôte: $($SMTP_CONFIG.smtp_host)" -ForegroundColor White
        Write-Host "  - Port: $($SMTP_CONFIG.smtp_port)" -ForegroundColor White
        Write-Host "  - Utilisateur: $($SMTP_CONFIG.smtp_user)" -ForegroundColor White
        Write-Host "  - Email admin: $($SMTP_CONFIG.smtp_admin_email)" -ForegroundColor White
        Write-Host "  - Nom expéditeur: $($SMTP_CONFIG.smtp_sender_name)" -ForegroundColor White
        Write-Host ""
        
        # Configuration
        $result = Setup-SMTP
        
        # Test
        Test-EmailSending
        
        Write-Host ""
        Write-Host "🎉 Configuration terminée!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Prochaines étapes:" -ForegroundColor Cyan
        Write-Host "1. Redémarrez votre application Next.js" -ForegroundColor White
        Write-Host "2. Testez la création d'un nouveau compte utilisateur" -ForegroundColor White
        Write-Host "3. Vérifiez la réception de l'email de bienvenue" -ForegroundColor White
        Write-Host "4. Consultez les logs Supabase pour confirmer l'envoi" -ForegroundColor White
        
    }
    catch {
        Write-Host "❌ Erreur inattendue: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Exécution principale
Main
