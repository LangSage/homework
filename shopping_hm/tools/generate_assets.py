from pathlib import Path
import subprocess
import textwrap


ROOT = Path(__file__).resolve().parents[1]
IMG_DIR = ROOT / "assets" / "images"
AUDIO_DIR = ROOT / "assets" / "audio"


def ps_quote(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def run_powershell(script: str) -> None:
    completed = subprocess.run(
        ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script],
        cwd=str(ROOT),
        text=True,
        capture_output=True,
        check=False,
    )
    if completed.returncode != 0:
        raise RuntimeError(completed.stderr or completed.stdout)


def generate_images() -> None:
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    script = rf"""
Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

function New-Bitmap([string]$Path, [int]$W, [int]$H, [scriptblock]$Draw) {{
  $bmp = New-Object System.Drawing.Bitmap($W, $H)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  & $Draw $g $W $H
  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}}

function Brush([string]$Color) {{ New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml($Color)) }}
function Penx([string]$Color, [float]$Width) {{ New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml($Color), $Width) }}
function Fontx([float]$Size, [int]$Style) {{ New-Object System.Drawing.Font('Segoe UI', ([single]$Size), ([System.Drawing.FontStyle]$Style)) }}
function Rect([int]$X, [int]$Y, [int]$W, [int]$H) {{ New-Object System.Drawing.Rectangle($X,$Y,$W,$H) }}
function Ellipse($g, $x, $y, $w, $h, $color) {{ $b = Brush $color; $g.FillEllipse($b, $x, $y, $w, $h); $b.Dispose() }}
function FillR($g, $x, $y, $w, $h, $color) {{ $b = Brush $color; $g.FillRectangle($b, $x, $y, $w, $h); $b.Dispose() }}
function DrawText($g, $text, $x, $y, $size, $color, $style) {{
  $b = Brush $color; $f = Fontx $size $style
  $g.DrawString($text, $f, $b, $x, $y)
  $f.Dispose(); $b.Dispose()
}}

$img = {ps_quote(str(IMG_DIR))}

New-Bitmap (Join-Path $img 'market_scene.png') 1200 675 {{
  param($g, $W, $H)
  FillR $g 0 0 $W $H '#f7fbff'
  FillR $g 0 520 $W 155 '#dfe9d8'
  FillR $g 0 0 $W 88 '#214e45'
  DrawText $g 'SUNNY MARKET' 34 21 32 '#ffffff' 1
  DrawText $g 'mission: shop for dinner' 850 34 18 '#ffe9a8' 0

  FillR $g 70 135 245 340 '#fff6dc'
  FillR $g 88 160 208 35 '#8b5e34'
  FillR $g 88 265 208 35 '#8b5e34'
  FillR $g 88 370 208 35 '#8b5e34'
  DrawText $g 'BREAD' 145 204 26 '#5b341a' 1
  for ($i=0; $i -lt 6; $i++) {{ Ellipse $g (100 + $i*30) 158 48 27 '#d98a35' }}
  for ($i=0; $i -lt 5; $i++) {{ Ellipse $g (110 + $i*37) 266 42 26 '#f0bb4b' }}

  FillR $g 375 135 250 340 '#e9f7ef'
  DrawText $g 'FRUIT' 455 154 26 '#23613c' 1
  for ($i=0; $i -lt 9; $i++) {{ Ellipse $g (398 + ($i%3)*66) (210 + [math]::Floor($i/3)*58) 42 42 '#e5493f' }}
  for ($i=0; $i -lt 8; $i++) {{ Ellipse $g (430 + ($i%4)*48) (408 + [math]::Floor($i/4)*42) 34 34 '#f4a62a' }}

  FillR $g 680 135 205 340 '#e8f2ff'
  DrawText $g 'DAIRY' 742 154 26 '#245588' 1
  for ($i=0; $i -lt 8; $i++) {{
    FillR $g (708 + ($i%4)*42) (220 + [math]::Floor($i/4)*74) 30 52 '#ffffff'
    FillR $g (708 + ($i%4)*42) (220 + [math]::Floor($i/4)*74) 30 15 '#7ac6ff'
  }}
  DrawText $g 'MILK' 739 400 24 '#245588' 1

  FillR $g 940 135 190 340 '#fff0f0'
  DrawText $g 'DRINKS' 982 154 26 '#8b2e33' 1
  for ($i=0; $i -lt 7; $i++) {{
    FillR $g (964 + ($i%3)*45) (225 + [math]::Floor($i/3)*58) 22 50 '#79c8e8'
    Ellipse $g (964 + ($i%3)*45) (217 + [math]::Floor($i/3)*58) 22 14 '#79c8e8'
  }}

  FillR $g 725 535 365 92 '#f8e6c7'
  FillR $g 746 508 310 44 '#734b2a'
  DrawText $g 'CASHIER' 845 516 24 '#ffffff' 1
  FillR $g 775 555 70 34 '#222222'
  FillR $g 858 550 64 44 '#d9e7ef'
  FillR $g 944 552 88 36 '#6cbf7c'

  Ellipse $g 490 498 62 62 '#f2c59f'
  FillR $g 505 560 34 76 '#3d7cc9'
  FillR $g 468 620 30 12 '#2b4973'
  FillR $g 530 620 30 12 '#2b4973'
  FillR $g 568 570 78 44 '#f4b54a'
  DrawText $g 'basket' 571 579 16 '#5a3608' 0
}}

New-Bitmap (Join-Path $img 'store_map.png') 1200 675 {{
  param($g, $W, $H)
  FillR $g 0 0 $W $H '#fcfbf5'
  FillR $g 62 60 1076 555 '#ffffff'
  $p = Penx '#2b2d42' 8
  $g.DrawRectangle($p, 62, 60, 1076, 555)
  $p.Dispose()
  DrawText $g 'SHOP MAP' 88 82 34 '#2b2d42' 1
  FillR $g 110 520 180 56 '#d8f3dc'
  DrawText $g 'ENTRANCE' 134 531 22 '#1b4332' 1
  FillR $g 126 172 260 160 '#f7d6d0'
  DrawText $g 'FRUIT' 202 224 32 '#8a2f25' 1
  FillR $g 126 360 260 110 '#f8edc8'
  DrawText $g 'BREAD' 198 389 31 '#7a4a1b' 1
  FillR $g 470 172 260 160 '#dff3ff'
  DrawText $g 'DAIRY' 542 224 32 '#245588' 1
  FillR $g 470 360 260 110 '#e7ecff'
  DrawText $g 'RICE' 565 389 31 '#39498a' 1
  FillR $g 805 172 250 160 '#ffe0e0'
  DrawText $g 'DRINKS' 858 224 32 '#8b2e33' 1
  FillR $g 805 410 250 86 '#f2d5b8'
  DrawText $g 'CASHIER' 858 430 28 '#6d3f1d' 1
  $pen = Penx '#748cab' 5
  $g.DrawLine($pen, 402, 245, 448, 245)
  $g.DrawLine($pen, 742, 245, 790, 245)
  $g.DrawLine($pen, 742, 418, 790, 455)
  $pen.Dispose()
}}

New-Bitmap (Join-Path $img 'basket_receipt.png') 1200 675 {{
  param($g, $W, $H)
  FillR $g 0 0 $W $H '#f4f1ea'
  DrawText $g 'BASKET CHECK' 70 52 36 '#263238' 1
  FillR $g 90 145 520 380 '#ffffff'
  FillR $g 112 485 476 42 '#b87333'
  $pen = Penx '#b87333' 9
  $g.DrawArc($pen, 180, 80, 340, 230, 198, 144)
  $pen.Dispose()
  $items = @(
    @('#d98a35', 'LOAF'),
    @('#ffffff', 'MILK'),
    @('#e5493f', 'APPLE'),
    @('#f4a62a', 'ORANGES'),
    @('#edf2fb', 'RICE')
  )
  for ($i=0; $i -lt $items.Count; $i++) {{
    $x = 135 + ($i%3)*145
    $y = 185 + [math]::Floor($i/3)*130
    FillR $g $x $y 118 80 $items[$i][0]
    DrawText $g $items[$i][1] ($x+14) ($y+26) 18 '#263238' 1
  }}
  FillR $g 720 86 310 510 '#fffdf8'
  $p = Penx '#d6c7ae' 4
  $g.DrawRectangle($p, 720, 86, 310, 510)
  $p.Dispose()
  DrawText $g 'RECEIPT' 810 125 28 '#263238' 1
  DrawText $g 'BREAD      2.10' 760 205 21 '#263238' 0
  DrawText $g 'MILK       1.40' 760 255 21 '#263238' 0
  DrawText $g 'APPLE      0.60' 760 305 21 '#263238' 0
  DrawText $g 'ORANGES    1.20' 760 355 21 '#263238' 0
  DrawText $g 'RICE       1.80' 760 405 21 '#263238' 0
  FillR $g 754 468 236 4 '#263238'
  DrawText $g 'TOTAL      7.10' 760 490 24 '#263238' 1
}}
"""
    run_powershell(script)


def generate_audio() -> None:
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    lines = {
        "clip_rice.mp3": "Excuse me, where is the rice, please?",
        "clip_basket.mp3": "There are two oranges and one apple in my basket.",
        "clip_water.mp3": "The bottle of water is too expensive.",
    }
    for name, text in lines.items():
        subprocess.run(
            [
                "python",
                "-m",
                "edge_tts",
                "-v",
                "en-US-JennyNeural",
                "--rate=-5%",
                "--text",
                text,
                "--write-media",
                str(AUDIO_DIR / name),
            ],
            cwd=str(ROOT),
            check=True,
        )


if __name__ == "__main__":
    generate_images()
    generate_audio()
    print("assets generated")
