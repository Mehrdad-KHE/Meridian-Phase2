param(
    [string]$ProjectRoot = "G:\My Drive\My Files\MERIDIAN FIGMA VER"
)

$ErrorActionPreference = "Stop"

$runtimeRoot = Join-Path $env:LOCALAPPDATA "ElegantRuntime\Meridian Figma Ver"
$mirrorRoot = Join-Path $runtimeRoot "reference-mirror"

$includePaths = @(
    "src",
    "source-of-truth-lock",
    "docs",
    "index.html",
    "package.json",
    "tsconfig.json",
    "vite.config.ts",
    "postcss.config.mjs",
    "MERIDIAN_README.md",
    "STATE.md",
    "HANDOFF.md",
    "TASKS.md",
    "RULES.md",
    "DECISIONS.md"
)

function Copy-SelectedPath {
    param(
        [string]$Source,
        [string]$Destination
    )

    if (Test-Path $Destination) {
        Remove-Item -LiteralPath $Destination -Recurse -Force
    }

    if (Test-Path $Source -PathType Container) {
        New-Item -ItemType Directory -Path (Split-Path $Destination -Parent) -Force | Out-Null
        Copy-Item -LiteralPath $Source -Destination $Destination -Recurse -Force
    } elseif (Test-Path $Source) {
        New-Item -ItemType Directory -Path (Split-Path $Destination -Parent) -Force | Out-Null
        Copy-Item -LiteralPath $Source -Destination $Destination -Force
    }
}

New-Item -ItemType Directory -Path $mirrorRoot -Force | Out-Null

foreach ($relativePath in $includePaths) {
    $source = Join-Path $ProjectRoot $relativePath
    $destination = Join-Path $mirrorRoot $relativePath
    if (Test-Path $source) {
        Copy-SelectedPath -Source $source -Destination $destination
    }
}

$queries = @(
    "how are dollar amounts displayed and formatted",
    "how does export gating block until all requirements are met",
    "how are HST and GST transactions categorized",
    "how are shareholder expenses marked and tracked",
    "how does the audit trail record financial decisions"
)

Push-Location $mirrorRoot
try {
    $updateOutput = graphify update . --no-cluster 2>&1
    $updateOutput | Out-Host

    $graphPath = Join-Path $mirrorRoot "graphify-out\graph.json"

    # corpus size from all source files
    $corpusWords = 0
    Get-ChildItem -Path $mirrorRoot -Recurse -File -Include "*.ts","*.tsx","*.md","*.json","*.html","*.mjs" | ForEach-Object {
        $content = Get-Content -LiteralPath $_.FullName -Raw -ErrorAction SilentlyContinue
        if ($content) { $corpusWords += ($content -split '\s+').Count }
    }
    $corpusTokens = [int]($corpusWords * 1.33)

    # node/edge count from update output
    $nodeEdgeLine = $updateOutput | Where-Object { $_ -match "(\d+) nodes" } | Select-Object -Last 1
    $nodeCount = if ($nodeEdgeLine -match "(\d+) nodes") { $Matches[1] } else { "?" }
    $edgeCount = if ($nodeEdgeLine -match "(\d+) edges") { $Matches[1] } else { "?" }

    Write-Host ""
    Write-Host "graphify token reduction benchmark (accounting domain)"
    Write-Host "--------------------------------------------------"
    Write-Host ("  Corpus:          {0} words -> ~{1} tokens (naive)" -f $corpusWords, $corpusTokens)
    Write-Host ("  Graph:           {0} nodes, {1} edges" -f $nodeCount, $edgeCount)

    $queryResults = @()
    foreach ($q in $queries) {
        $out = graphify query $q --graph $graphPath --budget 2000 2>&1
        $outText = ($out -join "`n")
        $outWords = ($outText -split '\s+').Count
        $qTokens = [math]::Max(1, [int]($outWords * 1.33))
        $reduction = [math]::Round($corpusTokens / $qTokens, 1)
        $queryResults += [PSCustomObject]@{ Q = $q; Tokens = $qTokens; Reduction = $reduction }
    }

    $avgTokens = [int](($queryResults | Measure-Object -Property Tokens -Average).Average)
    $avgReduction = [math]::Round(($queryResults | Measure-Object -Property Reduction -Average).Average, 1)

    Write-Host ("  Avg query cost:  ~{0} tokens" -f $avgTokens)
    Write-Host ("  Reduction:       {0}x fewer tokens per query" -f $avgReduction)
    Write-Host ""
    Write-Host "  Per question:"
    foreach ($r in $queryResults) {
        Write-Host ("    [{0}x] {1}" -f $r.Reduction, $r.Q)
    }
} finally {
    Pop-Location
}
