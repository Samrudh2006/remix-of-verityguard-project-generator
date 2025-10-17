param(
  [string]$Root = "site",
  [int]$Port = 5173
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-ContentType([string]$path) {
  $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
  switch ($ext) {
    '.html' { 'text/html; charset=utf-8' }
    '.htm'  { 'text/html; charset=utf-8' }
    '.css'  { 'text/css; charset=utf-8' }
    '.js'   { 'application/javascript; charset=utf-8' }
    '.mjs'  { 'application/javascript; charset=utf-8' }
    '.json' { 'application/json; charset=utf-8' }
    '.svg'  { 'image/svg+xml' }
    '.png'  { 'image/png' }
    '.jpg'  { 'image/jpeg' }
    '.jpeg' { 'image/jpeg' }
    '.gif'  { 'image/gif' }
    '.webp' { 'image/webp' }
    '.ico'  { 'image/x-icon' }
    '.txt'  { 'text/plain; charset=utf-8' }
    default { 'application/octet-stream' }
  }
}

function Join-NormalizedPath([string]$basePath, [string]$relative) {
  $combined = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($basePath, $relative))
  $baseFull = [System.IO.Path]::GetFullPath($basePath)
  if (-not $combined.StartsWith($baseFull, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Attempted path traversal outside root."
  }
  return $combined
}

$rootFull = [System.IO.Path]::GetFullPath($Root)
if (-not (Test-Path -LiteralPath $rootFull -PathType Container)) {
  throw "Root folder not found: $rootFull"
}

$ip = [System.Net.IPAddress]::Loopback
$listener = [System.Net.Sockets.TcpListener]::new($ip, $Port)
$listener.Start()
Write-Host "Serving $rootFull at http://localhost:$Port/" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop."

function Write-Response($client, [byte[]]$body, [int]$statusCode, [string]$statusText, [string]$contentType) {
  $stream = $client.GetStream()
  $writer = New-Object System.IO.StreamWriter($stream, [System.Text.Encoding]::ASCII, 1024, $true)
  $writer.NewLine = "\r\n"
  $writer.WriteLine("HTTP/1.1 $statusCode $statusText")
  $writer.WriteLine("Content-Type: $contentType")
  $writer.WriteLine("Content-Length: " + $body.Length)
  $writer.WriteLine("Cache-Control: no-cache")
  $writer.WriteLine("Connection: close")
  $writer.WriteLine()
  $writer.Flush()
  $stream.Write($body, 0, $body.Length)
  try { $stream.Flush() } catch {}
}

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    Start-Job -ScriptBlock {
      param($client, $rootFull)
      try {
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
        $requestLine = $reader.ReadLine()
        if (-not $requestLine) { $client.Close(); return }
        $parts = $requestLine.Split(' ')
        if ($parts.Length -lt 2) { $client.Close(); return }
        $method = $parts[0]
        $urlPath = $parts[1]
        # consume remaining headers
        while ($true) {
          $line = $reader.ReadLine()
          if ($null -eq $line -or $line -eq '') { break }
        }

        # decode and normalize
        try { $decoded = [System.Uri]::UnescapeDataString($urlPath) } catch { $decoded = $urlPath }
        if ($decoded.EndsWith('/')) { $decoded = $decoded + 'index.html' }
        $rel = $decoded.TrimStart('/')
        if ($rel -match '\.\.') { throw "Path traversal" }
        $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($rootFull, $rel))
        if (-not $filePath.StartsWith($rootFull, [System.StringComparison]::OrdinalIgnoreCase)) { throw "Outside root" }

        $status = 200; $statusText = 'OK'
        if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
          $fallback = [System.IO.Path]::Combine($rootFull, '404.html')
          if (Test-Path -LiteralPath $fallback -PathType Leaf) {
            $filePath = $fallback; $status = 404; $statusText = 'Not Found'
          } else {
            $bytes = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
            [scriptblock]::Create(${function:Write-Response}).InvokeReturnAsIs($client, $bytes, 404, 'Not Found', 'text/plain; charset=utf-8')
            $client.Close(); return
          }
        }

        $contentType = & { param($p) switch ([System.IO.Path]::GetExtension($p).ToLowerInvariant()) {
          '.html' { 'text/html; charset=utf-8'; break }
          '.htm'  { 'text/html; charset=utf-8'; break }
          '.css'  { 'text/css; charset=utf-8'; break }
          '.js'   { 'application/javascript; charset=utf-8'; break }
          '.mjs'  { 'application/javascript; charset=utf-8'; break }
          '.json' { 'application/json; charset=utf-8'; break }
          '.svg'  { 'image/svg+xml'; break }
          '.png'  { 'image/png'; break }
          '.jpg'  { 'image/jpeg'; break }
          '.jpeg' { 'image/jpeg'; break }
          '.gif'  { 'image/gif'; break }
          '.webp' { 'image/webp'; break }
          '.ico'  { 'image/x-icon'; break }
          default { 'application/octet-stream' }
        } } $filePath

        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        [scriptblock]::Create(${function:Write-Response}).InvokeReturnAsIs($client, $bytes, $status, $statusText, $contentType)
      } catch {
        try {
          $err = [System.Text.Encoding]::UTF8.GetBytes('500 Internal Server Error')
          [scriptblock]::Create(${function:Write-Response}).InvokeReturnAsIs($client, $err, 500, 'Internal Server Error', 'text/plain; charset=utf-8')
        } catch {}
      } finally {
        try { $client.Close() } catch {}
      }
    } -ArgumentList $client, $rootFull | Out-Null
  }
} finally {
  try { $listener.Stop() } catch {}
}
