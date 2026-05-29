#!/usr/bin/env python
"""
record_v2.py
Graba el prototipo HTML de Hero Video V2 con Playwright (Chromium headless).
Viewport 1920x1080 para que vw CSS escale nativo a 1080p.

Estrategia de compositing:
  - Playwright captura SOLO el overlay de texto (fondo oculto, chroma key magenta #FF00FF)
  - El <video> sigue reproduciendo invisible → currentTime mantiene el timing de escenas
  - ffmpeg compone el overlay sobre V1_hero_final.mp4 directamente desde disco
  - Resultado: video de fondo fluido (24fps nativo) + texto suave (25fps WebM)

Outputs:
  media/hero_1920.mp4  — master 1080p CRF 16
  media/hero_1280.mp4  — fallback 720p / 5 Mbps
"""

import subprocess, os, sys, time, io, threading, socket
import http.server
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

BASE      = r"C:\Users\sebas\OneDrive\IA\ExecForward"
PROTO_DIR = os.path.join(BASE, "video_v2_prototype")
AUDIO_DIR = os.path.join(BASE, "media", "audio")
VO        = os.path.join(AUDIO_DIR, "vo_v1_hero.mp3")
MUSIC     = os.path.join(AUDIO_DIR, "music_v1.mp3")
BG_VIDEO  = os.path.join(BASE, "video_v2_prototype", "assets", "V1_hero_final.mp4")
WEBM_DIR  = os.path.join(BASE, "media")
MP4_1080  = os.path.join(BASE, "media", "hero_1920.mp4")
MP4_720   = os.path.join(BASE, "media", "hero_1280.mp4")
DURATION  = 75
W, H      = 1920, 1080   # viewport nativo 1080p

print("=" * 60)
print("ExecForward Hero Video V2 — Grabacion 1080p")
print("=" * 60)

for f in [VO, MUSIC, BG_VIDEO]:
    assert os.path.exists(f), f"Falta: {f}"
print("Archivos de audio y video de fondo: OK")

# ── Servidor HTTP local ──────────────────────────────────────
def free_port():
    s = socket.socket(); s.bind(('', 0)); p = s.getsockname()[1]; s.close(); return p

PORT = free_port()

class SilentHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass

os.chdir(PROTO_DIR)
httpd = http.server.HTTPServer(('127.0.0.1', PORT), SilentHandler)
t_srv = threading.Thread(target=httpd.serve_forever); t_srv.daemon = True; t_srv.start()
print(f"Servidor HTTP: http://127.0.0.1:{PORT}/")

URL = f"http://127.0.0.1:{PORT}/Hero%20Video%20V2.html"

# Valores de crop por defecto para 1920x1080 (se sobreescriben con bbox real)
CROP_X, CROP_Y, CROP_W, CROP_H = 178, 95, 1564, 880

# ── Playwright ───────────────────────────────────────────────
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        args=[
            "--autoplay-policy=no-user-gesture-required",
            "--disable-blink-features=AutomationControlled",
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--use-gl=swiftshader",
            "--disable-gpu",
        ]
    )

    context = browser.new_context(
        viewport={"width": W, "height": H},
        record_video_dir=WEBM_DIR,
        record_video_size={"width": W, "height": H},
    )

    page = context.new_page()
    t_page_open = time.time()
    print(f"Cargando: {URL}")
    page.goto(URL, wait_until="load", timeout=30000)

    time.sleep(3)

    # Ocultar video de fondo + scrim → chroma key magenta para compositing en ffmpeg
    # opacity:0 NO cambia layout → no reproduce el bug de black video
    # El <video> sigue reproduciendo (invisible) → currentTime mantiene timing de escenas
    page.add_style_tag(content="""
        .bg-video { opacity: 0 !important; }
        .scrim    { opacity: 0 !important; }
        .cta-card { background: rgba(17,21,31,1) !important;
                    border: 1px solid rgba(40,52,72,1) !important; }
    """)
    time.sleep(0.3)  # deja un frame para repaint

    # Leer bounding box exacto del stage
    try:
        bbox = page.eval_on_selector('.stage', """el => {
            const r = el.getBoundingClientRect();
            return {x: Math.round(r.x), y: Math.round(r.y),
                    w: Math.round(r.width), h: Math.round(r.height)};
        }""")
        CROP_X = bbox['x']
        CROP_Y = bbox['y']
        CROP_W = bbox['w']
        CROP_H = bbox['h']
        print(f"Stage bbox: x={CROP_X} y={CROP_Y} {CROP_W}x{CROP_H}")
    except Exception as e:
        print(f"BBox fallback ({e}): {CROP_X},{CROP_Y} {CROP_W}x{CROP_H}")

    # Forzar reproduccion del video de fondo
    try:
        page.evaluate("""() => {
            const v = document.querySelector('video.bg-video');
            if (v) { v.currentTime = 0; v.muted = true; v.play().catch(() => {}); }
        }""")
        print("Video de fondo: play() enviado")
    except Exception as e:
        print(f"Advertencia video: {e}")

    try:
        page.wait_for_function("""() => {
            const v = document.querySelector('video.bg-video');
            return v && !v.paused && v.readyState >= 3;
        }""", timeout=10000)
        print("Video de fondo: reproduciendo")
    except Exception:
        print("Advertencia: video no confirmo reproduccion (continuando)")

    page.evaluate("""() => {
        const v = document.querySelector('video.bg-video');
        if (v) { v.currentTime = 0; v.play().catch(() => {}); }
    }""")

    t_anim_start = time.time()
    setup_offset = round(t_anim_start - t_page_open, 2)
    print(f"Setup offset: {setup_offset}s")

    print(f"\nGrabando {DURATION}s a {W}x{H}...")
    t0 = time.time()
    for i in range(DURATION):
        elapsed = time.time() - t0
        print(f"  {i+1:3d}/{DURATION}s  ({elapsed:.1f}s real)", end="\r", flush=True)
        time.sleep(1)
    print(f"\nGrabacion: {time.time()-t0:.1f}s reales")

    print("Finalizando grabacion...")
    page.close()
    context.close()
    browser.close()

httpd.shutdown()

# Encontrar el WebM mas reciente
webm_files = sorted(
    [os.path.join(WEBM_DIR, f) for f in os.listdir(WEBM_DIR) if f.endswith(".webm")],
    key=os.path.getmtime, reverse=True
)
if not webm_files:
    print("ERROR: no se encontro WebM"); sys.exit(1)

webm = webm_files[0]
webm_mb = os.path.getsize(webm) / 1024 / 1024
print(f"WebM: {os.path.basename(webm)}  ({webm_mb:.1f} MB)")

if webm_mb < 0.05:
    print("ERROR: WebM demasiado pequeño — captura fallo"); sys.exit(1)

import json

# ── Master 1080p ──────────────────────────────────────────────
print(f"\n[1/2] Master 1080p — compositing overlay+bg, crop {CROP_W}x{CROP_H}+{CROP_X}+{CROP_Y} -> 1920x1080")
fc = (
    # BG (input 3): V1_hero_final.mp4 directo desde disco — 24fps nativo, fluido
    # Escalar a 1080p + oscurecer 30% (aproximacion del scrim)
    "[3:v]scale=1920:1080:flags=lanczos,"
    "colorchannelmixer=rr=0.70:gg=0.70:bb=0.70[bg];"
    # Overlay (input 0): WebM con chroma key magenta → alpha
    # crop stage, escalar, colorkey #FF00FF
    f"[0:v]crop={CROP_W}:{CROP_H}:{CROP_X}:{CROP_Y},"
    "scale=1920:1080:flags=lanczos,"
    "colorkey=color=black:similarity=0.04:blend=0.02[overlay];"
    # Composite
    "[bg][overlay]overlay=0:0[v_out];"
    # Audio (sin cambios)
    "[1:a]volume=1.0[vo];"
    "[2:a]volume=0.12,afade=t=out:st=73.0:d=2.0,atrim=duration=75.5[music];"
    "[vo][music]amix=inputs=2:duration=first:dropout_transition=2[a_mix];"
    "[a_mix]loudnorm=I=-14:LRA=11:TP=-2[a_out]"
)
cmd = [
    "ffmpeg", "-y",
    "-ss", str(setup_offset),
    "-i", webm,              # input 0: overlay WebM (texto sobre magenta)
    "-i", VO,                # input 1: voiceover
    "-i", MUSIC,             # input 2: musica
    "-i", BG_VIDEO,          # input 3: video de fondo nativo (24fps, fluido)
    "-filter_complex", fc,
    "-map", "[v_out]", "-map", "[a_out]",
    "-c:v", "libx264", "-profile:v", "high", "-level:v", "4.1",
    "-preset", "medium", "-crf", "16",
    "-r", "30", "-bf", "0",   # bf 0: sin B-frames → DTS limpio
    "-c:a", "aac", "-b:a", "320k", "-ar", "48000",
    "-t", str(DURATION),
    "-movflags", "+faststart",
    MP4_1080
]
r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
if r.returncode != 0:
    print("ERROR ffmpeg master:"); print(r.stderr[-3000:]); sys.exit(1)

info = json.loads(subprocess.run(
    ["ffprobe","-v","quiet","-print_format","json","-show_format", MP4_1080],
    capture_output=True, text=True).stdout)
dur = float(info["format"]["duration"])
size = os.path.getsize(MP4_1080)/1024/1024
print(f"   OK: {dur:.2f}s  {size:.1f} MB -> {MP4_1080}")

# ── Fallback 720p ─────────────────────────────────────────────
print(f"\n[2/2] Fallback 720p — downscale Lanczos -> 1280x720")
cmd720 = [
    "ffmpeg", "-y",
    "-i", MP4_1080,
    "-vf", "scale=1280:720:flags=lanczos",
    "-c:v", "libx264", "-preset", "medium", "-b:v", "5M",
    "-c:a", "copy",
    "-movflags", "+faststart",
    MP4_720
]
r2 = subprocess.run(cmd720, capture_output=True, text=True, encoding="utf-8", errors="replace")
if r2.returncode != 0:
    print("ERROR ffmpeg 720p:"); print(r2.stderr[-2000:]); sys.exit(1)

size720 = os.path.getsize(MP4_720)/1024/1024
print(f"   OK: {size720:.1f} MB -> {MP4_720}")

print("\n" + "=" * 60)
print("LISTO")
print(f"  Master 1080p : hero_1920.mp4  ({size:.1f} MB)")
print(f"  Fallback 720p: hero_1280.mp4  ({size720:.1f} MB)")
print("=" * 60)
