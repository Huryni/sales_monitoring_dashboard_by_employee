@echo off
chcp 65001 >nul
echo ========================================
echo 🌐 Dashboard de Desempenho - Rede Local
echo ========================================
echo.
echo Iniciando servidor na rede local...
echo.
echo ⚠️  IMPORTANTE:
echo - Mantenha esta janela aberta
echo - Anote o endereço "Network" que aparecerá
echo - Compartilhe esse endereço com sua equipe
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
echo ========================================
echo.

cd dashboard
npm run dev:network

pause
