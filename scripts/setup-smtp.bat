@echo off
setlocal enabledelayedexpansion

echo Configuration SMTP IONOS pour Supabase
echo =====================================
echo.

REM Configuration des variables
set SUPABASE_PROJECT_REF=rtttjomxnchffqqaafxa
REM METTRE ICI VOTRE VRAIE CLÉ SERVICE_ROLE DEPUIS SUPABASE DASHBOARD
REM Allez sur: https://supabase.com/dashboard/project/rtttjomxnchffqqaafxa/settings/api
REM Copiez la clé "service_role" (commence par eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)
set SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dHRqb214bmNoZmZxcWFhZnhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDUyMzU0MCwiZXhwIjoyMDkwMDk5NTQwfQ.g7G3SvP8Q12otYv7yiKjeBARU1DHxvKJ3rKvLqScnzk
set IONOS_EMAIL_PASS=Kenays238.
set IONOS_SMTP_HOST=smtp.ionos.fr
set IONOS_SMTP_PORT=587
set IONOS_EMAIL_USER=contact@jayscreationsdesign.fr
set IONOS_ADMIN_EMAIL=contact@jayscreationsdesign.fr

echo Configuration SMTP:
echo   - Hote: %IONOS_SMTP_HOST%
echo   - Port: %IONOS_SMTP_PORT%
echo   - Utilisateur: %IONOS_EMAIL_USER%
echo   - Email admin: %IONOS_ADMIN_EMAIL%
echo   - Nom expediteur: Jay's Creations Design
echo.

echo Envoi de la configuration a Supabase...

REM Création du JSON
set "json={\"external_email_enabled\":true,\"smtp_host\":\"%IONOS_SMTP_HOST%\",\"smtp_port\":%IONOS_SMTP_PORT%,\"smtp_user\":\"%IONOS_EMAIL_USER%\",\"smtp_pass\":\"%IONOS_EMAIL_PASS%\",\"smtp_admin_email\":\"%IONOS_ADMIN_EMAIL%\",\"smtp_sender_name\":\"Jay's Creations Design\"}"

REM Appel API Supabase avec curl
curl -X PATCH "https://api.supabase.com/v1/projects/%SUPABASE_PROJECT_REF%/config/auth" ^
  -H "Authorization: Bearer %SUPABASE_SERVICE_KEY%" ^
  -H "Content-Type: application/json" ^
  -d "%json%"

echo.
echo Configuration terminee!
echo.
echo Prochaines etapes:
echo 1. Redemarrez votre application Next.js
echo 2. Testez la creation d'un nouveau compte utilisateur
echo 3. Verifiez la reception de l'email de bienvenue
echo 4. Consultez les logs Supabase pour confirmer l'envoi

pause
