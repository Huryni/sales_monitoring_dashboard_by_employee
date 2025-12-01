# Dashboard de Desempenho - Rede Local
# Execute com: powershell -ExecutionPolicy Bypass -File iniciar-rede.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🌐 Dashboard de Desempenho - Rede Local" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Obter IP local
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.254.*"} | Select-Object -First 1).IPAddress

if ($ipAddress) {
    Write-Host "📍 Seu IP local: $ipAddress" -ForegroundColor Yellow
    Write-Host "🌐 Endereço para compartilhar: http://${ipAddress}:3000" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Iniciando servidor na rede local..." -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANTE:" -ForegroundColor Yellow
Write-Host "- Mantenha esta janela aberta" -ForegroundColor White
Write-Host "- Anote o endereço 'Network' que aparecerá" -ForegroundColor White
Write-Host "- Compartilhe esse endereço com sua equipe" -ForegroundColor White
Write-Host ""
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Red
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location dashboard
npm run dev:network
