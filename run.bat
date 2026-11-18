@echo off
title A Magical Love Surprise Website 💗
echo ========================================================
echo   💗 Launching A Magical Love Surprise for My Boyfriend 💗
echo ========================================================
echo.

cd /d "%~dp0"

IF NOT EXIST "node_modules\" (
    echo [1/2] Installing dependencies, please wait a moment...
    call npm install
    echo.
)

echo [2/2] Starting preview server...
echo.
echo Your website will open shortly at: http://localhost:5173
echo (Press Ctrl+C in this window anytime to stop)
echo.

start http://localhost:5173
call npm run dev

pause
