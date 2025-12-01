@echo off
chcp 65001 >nul
echo ========================================
echo 🔍 Descobrir IP para Rede Local
echo ========================================
echo.
echo Seu(s) endereço(s) IP:
echo.

ipconfig | findstr /i "IPv4"

echo.
echo ========================================
echo.
echo 📝 Como usar:
echo.
echo 1. Anote o número que aparece após "IPv4"
echo    Exemplo: 192.168.1.100
echo.
echo 2. O endereço completo será:
echo    http://[SEU_IP]:3000
echo    Exemplo: http://192.168.1.100:3000
echo.
echo 3. Compartilhe esse endereço com sua equipe
echo.
echo ========================================
echo.
pause
