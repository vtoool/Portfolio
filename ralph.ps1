param(
    [Parameter(Mandatory=$true)]
    [string]$Task,
    [int]$Iterations = 30
)

# 1. Create a unique Plan ID (so you have history)
$timestamp = Get-Date -Format "HHmm-ss"
$planFile = "plan_$timestamp.md"

Write-Host "🤖 Ralph: Architecting plan for: '$Task'..." -ForegroundColor Cyan

# 2. THE ARCHITECT PHASE
# We tell OpenCode to look at the project and create a checklist
$architectPrompt = @"
Analyze the project. I want to: $Task
Create a detailed implementation plan in a NEW file named $planFile.
Format it as a Markdown checklist (- [ ] Task).
DO NOT write code yet. Just save the plan file.
"@

# Run OpenCode (Non-interactive)
opencode run $architectPrompt

if (-not (Test-Path $planFile)) {
    Write-Host "❌ Agent failed to create $planFile." -ForegroundColor Red
    exit
}

Write-Host "✅ Plan Created: $planFile" -ForegroundColor Green

# 3. THE BUILDER PHASE (The Loop)
$mission = @"
I am running in an autonomous loop working on $planFile.
1. Read $planFile. Find the highest priority [ ] (unchecked) task.
2. IF all tasks are checked, strictly reply: 'NO TASKS LEFT'.
3. OTHERWISE:
   - Implement the task.
   - Run 'npm test' (or verify visually).
   - IF FAIL: Fix it.
   - IF PASS: Edit $planFile and mark the task as [x].
"@

Write-Host "🔨 Ralph: Building..." -ForegroundColor Yellow

for ($i = 1; $i -le $Iterations; $i++) {
    Write-Host "[Loop $i] Executing plan..." -ForegroundColor DarkGray
    
    # Run the builder mission
    $output = opencode run $mission
    
    if ($output -match "NO TASKS LEFT") {
        Write-Host "✅ Mission Complete!" -ForegroundColor Green
        break
    }
}