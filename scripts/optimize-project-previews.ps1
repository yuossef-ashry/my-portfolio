$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$sourceDirectory = Join-Path $projectRoot "assets-source/project-previews"
$outputDirectory = Join-Path $projectRoot "public/images/projects"

if (-not (Test-Path -LiteralPath $sourceDirectory -PathType Container)) {
  throw "Project preview source directory not found: $sourceDirectory"
}

New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object MimeType -eq "image/jpeg"
$encoderParameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
$encoderParameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new(
  [System.Drawing.Imaging.Encoder]::Quality,
  [long]92
)

try {
  Get-ChildItem -LiteralPath $sourceDirectory -Filter "*.png" -File | ForEach-Object {
    $sourceImage = [System.Drawing.Image]::FromFile($_.FullName)
    $outputPath = Join-Path $outputDirectory ($_.BaseName + ".jpg")
    $canvas = [System.Drawing.Bitmap]::new($sourceImage.Width, $sourceImage.Height)

    try {
      $graphics = [System.Drawing.Graphics]::FromImage($canvas)
      try {
        $graphics.Clear([System.Drawing.Color]::White)
        $graphics.DrawImage($sourceImage, 0, 0, $sourceImage.Width, $sourceImage.Height)
      }
      finally {
        $graphics.Dispose()
      }

      $canvas.Save($outputPath, $jpegEncoder, $encoderParameters)
      $outputFile = Get-Item -LiteralPath $outputPath
      Write-Output ("{0}: {1:N0} KB" -f $outputFile.Name, ($outputFile.Length / 1KB))
    }
    finally {
      $canvas.Dispose()
      $sourceImage.Dispose()
    }
  }
}
finally {
  $encoderParameters.Dispose()
}
