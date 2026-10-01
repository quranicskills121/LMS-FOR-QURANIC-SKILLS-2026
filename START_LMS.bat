@echo off
title Quranic Skills Academy LMS Server
cd /d "%~dp0"
set "PATH=C:\Users\QURANIC SKILLS\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.19.0-win-x64;%PATH%"

echo ========================================================
echo   Starting Quranic Skills Academy LMS (Production Server)
echo ========================================================
echo.

if not exist ".next\BUILD_ID" (
    echo [INFO] Building production bundle, please wait a moment...
    call "%~dp0next-cli.cmd" build
    if errorlevel 1 (
        echo.
        echo [ERROR] Build failed. Please contact support.
        pause
        exit /b 1
    )
)

echo Opening LMS in your default browser...
start http://localhost:3000
echo.
echo Server is running on:
echo   - Local PC:   http://localhost:3000
echo   - Mobile/Tab: http://192.168.18.133:3000
echo.
echo Please KEEP this window open while using the LMS.
echo (To close the LMS, simply close this window)
echo ========================================================
echo.
call "%~dp0next-cli.cmd" start -p 3000
pause
