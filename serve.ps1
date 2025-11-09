$prefix = "http://localhost:8000/"
$root = Split-Path -Parent $MyInvocation.MyCommand.Definition

Write-Output "Starting simple file server for: $root at $prefix"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
} catch {
    Write-Error "Failed to start HttpListener: $_"
    exit 1
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
    } catch {
        break
    }
    $request = $context.Request
    $response = $context.Response

    $localPath = $request.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrEmpty($localPath)) { $localPath = 'index.html' }

    $filePath = Join-Path $root $localPath

    if (Test-Path $filePath) {
        try {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                '.html' { $ctype='text/html' }
                '.css'  { $ctype='text/css' }
                '.js'   { $ctype='application/javascript' }
                '.jpg' { $ctype='image/jpeg' }
                '.jpeg' { $ctype='image/jpeg' }
                '.png' { $ctype='image/png' }
                '.gif' { $ctype='image/gif' }
                default { $ctype='application/octet-stream' }
            }
            $response.ContentType = $ctype
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes,0,$bytes.Length)
        } catch {
            $response.StatusCode = 500
            $msg = "Server error"
            $buf = [System.Text.Encoding]::UTF8.GetBytes($msg)
            $response.ContentType = 'text/plain'
            $response.ContentLength64 = $buf.Length
            $response.OutputStream.Write($buf,0,$buf.Length)
        }
    } else {
        $response.StatusCode = 404
        $msg = 'Not Found'
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($msg)
        $response.ContentType = 'text/plain'
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer,0,$buffer.Length)
    }
    $response.OutputStream.Close()
}

$listener.Stop()
$listener.Close()
