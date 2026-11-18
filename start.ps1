Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "  💗 Launching A Magical Love Surprise for My Boyfriend 💗" -ForegroundColor Magenta
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host ""

Set-Location -Path $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "[1/2] Installing dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host "[2/2] Starting server at http://localhost:5173 ..." -ForegroundColor Green
Start-Process "http://localhost:5173"
npm run dev
