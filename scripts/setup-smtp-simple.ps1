#!/usr/bin/env pwsh

# Script PowerShell simple pour configurer SMTP IONOS pour Supabase
# Usage: .\scripts\setup-smtp-simple.ps1

$ErrorActionPreference = "Stop"

# Lecture des variables d'environnement
$SUPABASE_PROJECT_REF = $env:SUPABASE_PROJECT_REF
$SUPABASE_SERVICE_KEY = $env:SUPABASE_SERVICE_KEY

# Configuration SMTP
$smtpHost = if ($env:IONOS_SMTP_HOST) { $env:IONOS_SMTP_HOST } else { "smtp.ionos.fr" }
$smtpPort = if ($env:IONOS_SMTP_PORT) { [int]$env:IONOS_SMTP_PORT } else { 587 }
$smtpUser = if ($env:IONOS_EMAIL_USER) { $env:IONOS_EMAIL_USER } else { "contact@jayscreationsdesign.fr" }
$smtpPass = $env:IONOS_EMAIL_PASS
$smtpAdminEmail = if ($env:IONOS_ADMIN_EMAIL) { $env:IONOS_ADMIN_EMAIL } else { "contact@jayscreationsdesign.fr" }

$SMTP_CONFIG = @{
    external_email_enabled = $true
    smtp_host = $smtpHost
    smtp_port = $smtpPort
    smtp_user = $smtpUser
    smtp_pass = $smtpPass
    smtp_admin_email = $smtpAdminEmail
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
        Write-Host "Variables d'environnement manquantes:" -ForegroundColor Red
        foreach ($var in $missing) {
            Write-Host "   - $var" -ForegroundColor Red
        }
        Write-Host ""
        Write-Host "Configurez ces variables dans PowerShell:" -ForegroundColor Yellow
        Write-Host '$env:SUPABASE_PROJECT_REF = "valeur"' -ForegroundColor Gray
        Write-Host '$env:SUPABASE_SERVICE_KEY = "valeur"' -ForegroundColor Gray
        Write-Host '$env:IONOS_EMAIL_PASS = "valeur"' -ForegroundColor Gray
        exit 1
    }
    
    Write-Host "Configuration validee" -ForegroundColor Green
}

function Setup-SMTP {
    $data = $SMTP_CONFIG | ConvertTo-Json -Depth 10
    
    $headers = @{
        'Authorization' = "Bearer $SUPABASE_SERVICE_KEY"
        'Content-Type' = 'application/json'
    }
    
    $uri = "https://api.supabase.com/v1/projects/$SUPABASE_PROJECT_REF/config/auth"
    
    try {
        Write-Host "Envoi de la configuration a Supabase..." -ForegroundColor Blue
        $response = Invoke-RestMethod -Uri $uri -Method Patch -Headers $headers -Body $data
        
        Write-Host "Configuration SMTP appliquee avec succes" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Erreur lors de la configuration SMTP: $($_.Exception.Message)" -ForegroundColor Red
        
        if ($_.Exception.Message -like "*401*") {
            Write-Host "Verifiez votre cle de service Supabase" -ForegroundColor Yellow
        } elseif ($_.Exception.Message -like "*404*") {
            Write-Host "Verifiez votre reference de projet Supabase" -ForegroundColor Yellow
        } elseif ($_.Exception.Message -like "*403*") {
            Write-Host "Verifiez les permissions de votre cle de service" -ForegroundColor Yellow
        }
        
        exit 1
    }
}

function Main {
    Write-Host "Configuration SMTP IONOS pour Supabase (PowerShell)" -ForegroundColor Cyan
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    
    try {
        # Validation
        Validate-Config
        
        # Affichage de la configuration
        Write-Host "Configuration SMTP:" -ForegroundColor Cyan
        Write-Host "  - Hote: $($SMTP_CONFIG.smtp_host)" -ForegroundColor White
        Write-Host "  - Port: $($SMTP_CONFIG.smtp_port)" -ForegroundColor White
        Write-Host "  - Utilisateur: $($SMTP_CONFIG.smtp_user)" -ForegroundColor White
        Write-Host "  - Email admin: $($SMTP_CONFIG.smtp_admin_email)" -ForegroundColor White
        Write-Host "  - Nom expediteur: $($SMTP_CONFIG.smtp_sender_name)" -ForegroundColor White
        Write-Host ""
        
        # Configuration
        $result = Setup-SMTP
        
        Write-Host ""
        Write-Host "Configuration terminee!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Prochaines etapes:" -ForegroundColor Cyan
        Write-Host "1. Redemarrez votre application Next.js" -ForegroundColor White
        Write-Host "2. Testez la creation d'un nouveau compte utilisateur" -ForegroundColor White
        Write-Host "3. Verifiez la reception de l'email de bienvenue" -ForegroundColor White
        Write-Host "4. Consultez les logs Supabase pour confirmer l'envoi" -ForegroundColor White
        
    }
    catch {
        Write-Host "Erreur inattendue: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Exécution principale
Main
