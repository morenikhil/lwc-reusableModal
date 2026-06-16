# LWC Reusable Modal

Reusable Salesforce Lightning Web Component modal with a demo component for quick validation in Lightning App Builder.

This project is configured to run with Salesforce CLI only.

<img width="4100" height="3100" alt="ReusableModal-Architecture" src="https://github.com/user-attachments/assets/9a343a82-6557-41c7-8167-29dd9781326a" />


## Run This Project (Sandbox)

Use this workflow if you are deploying to an existing Salesforce Sandbox.

### Prerequisites

- Salesforce CLI (`sf`)
- Access to a Salesforce Sandbox org

### 1. Open terminal in project root

Run all commands from this repository root.

### 2. Login to Sandbox and set default org

```powershell
sf org login web --alias YOUR_SANDBOX_ALIAS --instance-url https://test.salesforce.com --set-default
sf config set target-org YOUR_SANDBOX_ALIAS
```

### 4. Deploy source

```powershell
sf project deploy start --source-dir force-app
```

### 5. Open org

```powershell
sf org open --target-org YOUR_SANDBOX_ALIAS
```

### 6. Add demo component in Lightning App Builder

1. Go to **Setup -> Lightning App Builder**.
2. Open a Home, App, or Record page.
3. Drag **reusableModalDemo** onto the page.
4. Save and Activate.

## Run This Project (Scratch Org)

Use this workflow if you want an isolated development org.

### 1. Login to Dev Hub

```powershell
sf org login web --alias YOUR_DEVHUB_ALIAS --set-default-dev-hub
```

### 2. Create and set default scratch org

```powershell
sf org create scratch --definition-file config/project-scratch-def.json --alias YOUR_SCRATCH_ALIAS --set-default --duration-days 7
```

### 3. Deploy source

```powershell
sf project deploy start --source-dir force-app
```

### 4. Open org

```powershell
sf org open --target-org YOUR_SCRATCH_ALIAS
```

### 5. Add demo component in Lightning App Builder

1. Go to **Setup -> Lightning App Builder**.
2. Open a Home, App, or Record page.
3. Drag **reusableModalDemo** onto the page.
4. Save and Activate.

## One-Block PowerShell Script (Sandbox)

Use this if you want a single script with fail-fast checks:

```powershell
$ErrorActionPreference = "Stop"

# ===== Settings =====
$Alias = "YOUR_SANDBOX_ALIAS"
$SandboxUrl = "https://test.salesforce.com"

Write-Host ""
Write-Host "Starting Sandbox setup and deploy..." -ForegroundColor Cyan

# ===== Pre-checks =====
if (-not (Test-Path "sfdx-project.json")) {
	throw "sfdx-project.json not found. Open PowerShell in the project root and run again."
}

if (-not (Get-Command sf -ErrorAction SilentlyContinue)) {
	throw "Salesforce CLI (sf) is not installed or not on PATH."
}

# ===== Sandbox login + default org =====
Write-Host "1) Logging into Sandbox (browser will open)..." -ForegroundColor Yellow
sf org login web --alias $Alias --instance-url $SandboxUrl --set-default

Write-Host "2) Setting default target org..." -ForegroundColor Yellow
sf config set target-org $Alias

# ===== Deploy =====
Write-Host "3) Deploying metadata from force-app..." -ForegroundColor Yellow
sf project deploy start --source-dir force-app

# ===== Open org =====
Write-Host "4) Opening org..." -ForegroundColor Yellow
sf org open --target-org $Alias

# ===== Verify =====
Write-Host "5) Verification..." -ForegroundColor Yellow
sf org list
sf config get target-org

Write-Host ""
Write-Host "Done. Next: Setup > Lightning App Builder > add reusableModalDemo > Save > Activate." -ForegroundColor Green
```

## Optional Salesforce Checks

```powershell
sf project deploy preview --source-dir force-app
sf org list
sf config get target-org
```

## Additional Docs

- Salesforce Extensions for VS Code: https://developer.salesforce.com/tools/vscode/
- Salesforce CLI Setup: https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm
- Salesforce CLI Command Reference: https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm
