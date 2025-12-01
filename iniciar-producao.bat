@echo off
chcp 65001 >nul
echo ========================================
echo 🏭 Dashboard - Modo Produção (Rede Local)
echo ========================================
echo.
echo Verificando se o projeto já foi compilado...
echo.

cd dashboard

if not exist ".next" (
    echo ⚙️  Compilando projeto pela primeira vez...
    echo Isso pode levar alguns minutos...
    echo.
    call npm run build
    echo.
    echo ✅ Compilação concluída!
    echo.
)

echo.
echo 🚀 Iniciando servidor de produção...
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

npm run start:network

pause
