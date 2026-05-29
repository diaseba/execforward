#!/usr/bin/env python3
"""
ExecForward Video Assembler
Builds: V1_hero_final.mp4 (74s) + V2_prequiz_final.mp4 (49s)

Text overlays: PIL/Pillow (bypasses fontconfig, which is broken on this system).
Video compositing: ffmpeg 8.1.1.
"""

import subprocess
import json
import os
import sys
import shutil
import io
import tempfile

# Force UTF-8 output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

from PIL import Image, ImageDraw, ImageFont

# ── PATHS ────────────────────────────────────────────────────────────────────
BASE      = r"C:\Users\sebas\OneDrive\IA\ExecForward"
MEDIA     = os.path.join(BASE, "media")
AUDIO_DIR = os.path.join(MEDIA, "audio")
VIDEO_DIR = os.path.join(MEDIA, "video")
LOGO_PATH = os.path.join(BASE, "assets", "Logo", "Variante D Dark Mode (1024x256px).png")
IMG_Q     = os.path.join(MEDIA, "quiz_pregunta.png")
IMG_R     = os.path.join(MEDIA, "quiz_resultado.png")
FONT_TTF  = r"C:\Windows\Fonts\arialbd.ttf"   # loaded directly by PIL (no fontconfig)
TMP_DIR   = os.path.join(BASE, "tmp_overlays")

W, H  = 1280, 720
FPS   = 30


# ── HELPERS ──────────────────────────────────────────────────────────────────

def get_duration(path):
    cmd = ["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", path]
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    return float(json.loads(r.stdout)["format"]["duration"])


def calc_durations(raw_durs, target):
    durs = list(raw_durs)
    durs[-1] = max(1.0, durs[-1] + (target - sum(durs)))
    return durs


def hex_to_rgb(s):
    """Parse '0x2563EB' or 'white' to (R,G,B)."""
    if s == "white":
        return (255, 255, 255)
    if s.startswith("0x") or s.startswith("0X"):
        h = s[2:]
        return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))
    return (255, 255, 255)


def make_logo_png(out_path):
    """
    ExecForward logo for video overlay: transparent bg + dark box for readability.
    White 'ExecForward' text + brand icon (blue stripes + teal chevrons from SVG spec).
    """
    S = 2  # 2x render for crisp quality
    PADX, PADY = 24*S, 14*S
    font_size = 52 * S
    font = ImageFont.truetype(FONT_TTF, font_size)

    # Measure text on scratch canvas
    scratch = Image.new("RGBA", (1, 1))
    sd = ImageDraw.Draw(scratch)
    bbox = sd.textbbox((0, 0), "ExecForward", font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]

    # Canvas dimensions: keep SVG icon domain (80 units) + vertical padding
    icon_domain_h = 80 * S
    CH = icon_domain_h + 2 * PADY
    GAP = 18 * S        # gap between text and icon
    STRIPE_W = 30 * S   # icon stripe width (from SVG)
    CHEV_W   = 50 * S   # chevrons span 49 units in SVG
    CW = 2 * PADX + tw + GAP + STRIPE_W + CHEV_W

    img = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Semi-transparent dark background for readability on any video bg
    draw.rectangle((0, 0, CW - 1, CH - 1), fill=(0, 0, 0, 155))

    # White text — vertically centered in canvas, left-padded
    text_x = PADX - bbox[0]
    text_y = (CH - th) // 2 - bbox[1]
    draw.text((text_x, text_y), "ExecForward", font=font, fill=(255, 255, 255, 255))

    # Icon: starts right of text
    IX = PADX + tw + GAP
    icon_y0 = PADY  # top of icon domain within canvas

    # 5 blue stripes (#60A5FA — luminous blue for dark bg)
    blue = (96, 165, 250, 255)
    for y_s in [10, 21, 32, 43, 54]:
        draw.rectangle(
            (IX, icon_y0 + y_s*S, IX + STRIPE_W, icon_y0 + (y_s + 7)*S),
            fill=blue
        )

    # 3 teal chevrons (#2DD4BF) with decreasing opacity, from SVG polygon coords
    DX = IX - 398 * S
    DY = icon_y0
    for pts, alpha in [
        ([(429,10),(443,40),(429,70),(436,70),(450,40),(436,10)], 255),
        ([(443,10),(457,40),(443,70),(450,70),(464,40),(450,10)], int(255*0.70)),
        ([(457,10),(471,40),(457,70),(464,70),(478,40),(464,10)], int(255*0.40)),
    ]:
        draw.polygon([(x*S + DX, y*S + DY) for x, y in pts],
                     fill=(45, 212, 191, alpha))

    img.save(out_path, "PNG")
    print(f"  Logo generated: {CW}x{CH}px -> {os.path.basename(out_path)}")


def make_text_png(text, y_frac, size, color_str, out_path, pad_x=14, pad_y=8):
    """
    Generate a 1280x720 RGBA PNG with centered text + semi-transparent background box.
    PIL draws directly from the TTF — no fontconfig needed.
    """
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))   # fully transparent canvas
    font = ImageFont.truetype(FONT_TTF, size)
    draw = ImageDraw.Draw(img)

    # Measure text
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]

    # Position: centered horizontally, y_frac from top
    x = (W - tw) // 2
    y = int(H * y_frac) - th // 2

    # Background box layer (50% opaque black)
    box_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bd = ImageDraw.Draw(box_layer)
    bd.rectangle(
        (x - pad_x, y - pad_y, x + tw + pad_x, y + th + pad_y),
        fill=(0, 0, 0, 127)
    )
    img = Image.alpha_composite(img, box_layer)

    # Text layer (fully opaque)
    r, g, b = hex_to_rgb(color_str)
    txt_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    td = ImageDraw.Draw(txt_layer)
    td.text((x, y), text, font=font, fill=(r, g, b, 255))
    img = Image.alpha_composite(img, txt_layer)

    img.save(out_path, "PNG")


def generate_text_overlays(texts, prefix):
    """
    texts: list of (text, t_in, t_out, y_frac, size, color_str)
    Returns: list of (png_path, t_in, t_out)
    """
    os.makedirs(TMP_DIR, exist_ok=True)
    result = []
    for i, (text, t_in, t_out, y_frac, size, color_str) in enumerate(texts):
        path = os.path.join(TMP_DIR, f"{prefix}_t{i:02d}.png")
        make_text_png(text, y_frac, size, color_str, path)
        result.append((path, t_in, t_out))
        print(f"  text {i:2d}: [{t_in}s-{t_out}s] {text[:40]}")
    return result


def clip_filter(idx, dur, raw_dur):
    """Scale + pad + trim (+ loop if needed) for one video clip."""
    base = (
        f"[{idx}:v]"
        f"scale={W}:{H}:force_original_aspect_ratio=decrease,"
        f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,"
        f"setpts=PTS-STARTPTS"
    )
    if dur > raw_dur + 0.1:
        return f"{base},loop=loop=-1:size=32767:start=0,trim=duration={dur:.4f},setpts=PTS-STARTPTS[c{idx}]"
    return f"{base},trim=duration={dur:.4f},setpts=PTS-STARTPTS[c{idx}]"


def run_ffmpeg(args, desc):
    print(f"\n[ffmpeg] {desc}")
    cmd = ["ffmpeg", "-y"] + args
    result = subprocess.run(
        cmd, capture_output=True, text=True, encoding="utf-8", errors="replace"
    )
    if result.returncode != 0:
        print("=" * 70)
        print("FFMPEG ERROR:")
        print(result.stderr[-4000:])
        print("=" * 70)
        sys.exit(1)
    print(f"[ok] {desc}")


# ── VIDEO 1 ──────────────────────────────────────────────────────────────────

def build_v1():
    # Extended to 75.0s: VO is 74.89s — old 74.0 was cutting off the last 0.9s of voice
    TARGET = 75.0
    OUT = os.path.join(MEDIA, "V1_hero_final.mp4")

    print("\n" + "=" * 70)
    print("BUILDING V1 -> V1_hero_final.mp4 (75 s)")
    print("=" * 70)

    # Generate correct logo overlay (transparent bg, white text + brand icon)
    os.makedirs(TMP_DIR, exist_ok=True)
    logo_overlay_path = os.path.join(TMP_DIR, "v1_logo_dark.png")
    print("\nGenerating logo overlay PNG...")
    make_logo_png(logo_overlay_path)

    clip_paths = [
        os.path.join(VIDEO_DIR, "V1_01__Hook_Esfuerzo_Tracci_n_.mp4"),
        os.path.join(VIDEO_DIR, "V1_02__Mercado_Abstract_.mp4"),
        os.path.join(VIDEO_DIR, "V1_03__Giro_.mp4"),
        os.path.join(VIDEO_DIR, "V1_04__Producto_Abstract_.mp4"),
        os.path.join(VIDEO_DIR, "V1_05__CTA_.mp4"),
    ]
    raw_durs = [get_duration(p) for p in clip_paths]
    print(f"Raw:  {[f'{d:.2f}s' for d in raw_durs]} total={sum(raw_durs):.2f}s")
    durs = calc_durations(raw_durs, TARGET)
    print(f"Adj:  {[f'{d:.2f}s' for d in durs]} total={sum(durs):.2f}s")

    # Text overlays
    # Timing: quiz screenshot t=59-65, logo t=67-75 — no triple overlap
    texts_v1 = [
        ("Mandaste 60 CVs. Nada.",                              2,  6,  0.85, 36, "white"),
        ("El problema no eres tu.",                             8, 13,  0.85, 32, "white"),
        ("El 70% de los cargos ejecutivos nunca se publican.", 16, 21,  0.85, 28, "white"),
        ("Si estas solo en el 30% visible, ya perdiste.",      23, 28,  0.85, 28, "white"),
        ("No necesitas mas esfuerzo.",                         33, 37,  0.85, 36, "white"),
        ("Necesitas un sistema.",                              38, 42,  0.85, 40, "white"),
        ("ExecForward",                                        46, 52,  0.40, 48, "0x2563EB"),
        ("Propuesta de valor - Mercado - CV - Red - Pitch",    53, 57,  0.85, 22, "white"),
        ("Diagnostico gratuito - 5 min - Resultado inmediato", 60, 65,  0.85, 26, "0x14B8A6"),
        ("Haz el diagnostico ->",                              67, 73,  0.72, 32, "white"),
    ]
    print("\nGenerating text overlay PNGs...")
    text_overlays = generate_text_overlays(texts_v1, "v1")

    # Inputs:
    # [0-4]: clips | [5]: VO | [6]: music
    # [7 .. 7+N-1]: text PNGs | [7+N]: IMG_Q | [7+N+1]: logo (generated)
    n_text = len(text_overlays)
    inputs = []
    for p in clip_paths:
        inputs += ["-i", p]
    inputs += ["-i", os.path.join(AUDIO_DIR, "vo_v1_hero.mp3")]
    inputs += ["-i", os.path.join(AUDIO_DIR, "music_v1.mp3")]
    for (path, _, _) in text_overlays:
        inputs += ["-loop", "1", "-i", path]
    idx_img_q = 7 + n_text
    idx_logo  = 7 + n_text + 1
    inputs += ["-loop", "1", "-i", IMG_Q]
    inputs += ["-loop", "1", "-i", logo_overlay_path]

    # Filter complex
    fc = []

    # 1. Scale + trim clips
    for i, (_, dur, raw) in enumerate(zip(clip_paths, durs, raw_durs)):
        fc.append(clip_filter(i, dur, raw))

    # 2. Concat
    fc.append("".join(f"[c{i}]" for i in range(5)) + "concat=n=5:v=1:a=0[v_raw]")

    # 3. Chain text overlays (full-frame 1280x720 RGBA PNGs, overlay at x=0,y=0)
    current = "v_raw"
    for i, (_, t_in, t_out) in enumerate(text_overlays):
        txt_idx = 7 + i
        next_lbl = f"vt{i}" if i < n_text - 1 else "v_text"
        fc.append(
            f"[{txt_idx}:v]format=rgba[tx{i}];"
            f"[{current}][tx{i}]overlay=x=0:y=0:"
            f"enable='between(t,{t_in},{t_out})'[{next_lbl}]"
        )
        current = next_lbl

    # 4. Quiz screenshot t=59-65 (ends before logo — no overlap)
    #    Centered, 55% video width, 25% from top, 85% opacity
    img_w = int(W * 0.55)
    img_y = int(H * 0.25)
    fc.append(
        f"[{idx_img_q}:v]scale={img_w}:-1:flags=lanczos,"
        f"format=rgba,colorchannelmixer=aa=0.85[img_q];"
        f"[v_text][img_q]overlay=x=(W-w)/2:y={img_y}:"
        f"enable='between(t,59,65)'[v_img]"
    )

    # 5. Logo overlay t=67-75 (CTA scene, clean — no quiz screenshot overlap)
    #    Generated logo has built-in dark bg box; 420px display width, 30% from top
    logo_y = int(H * 0.30)
    fc.append(
        f"[{idx_logo}:v]scale=420:-1:flags=lanczos,"
        f"format=rgba,colorchannelmixer=aa=0.95[logo];"
        f"[v_img][logo]overlay=x=(W-w)/2:y={logo_y}:"
        f"enable='between(t,67,75)'[v_final]"
    )

    # 6. Audio: VO plays full length (74.89s); music fades out at 73s
    fc.append("[5:a]volume=1.0[vo]")
    fc.append("[6:a]volume=0.12,afade=t=out:st=73.0:d=2.0,atrim=duration=75.5[music]")
    fc.append("[vo][music]amix=inputs=2:duration=first:dropout_transition=2[a_out]")

    filter_complex = ";\n".join(fc)

    fc_file = os.path.join(BASE, "fc_v1.txt")
    with open(fc_file, "w", encoding="utf-8") as fh:
        fh.write(filter_complex)

    run_ffmpeg(
        inputs
        + ["-/filter_complex", fc_file]
        + ["-map", "[v_final]", "-map", "[a_out]"]
        + ["-c:v", "libx264", "-preset", "medium", "-crf", "20"]
        + ["-c:a", "aac", "-b:a", "192k"]
        + ["-t", str(TARGET)]
        + ["-movflags", "+faststart"]
        + [OUT],
        desc="V1_hero_final.mp4 (75 s)"
    )

    if os.path.exists(OUT):
        dur  = get_duration(OUT)
        size = os.path.getsize(OUT) / 1024 / 1024
        print(f"\nOK  V1_hero_final.mp4")
        print(f"    Path:     {OUT}")
        print(f"    Duration: {dur:.2f}s  (target {TARGET}s)")
        print(f"    Size:     {size:.1f} MB")
    else:
        print("ERROR: output not created.")
        sys.exit(1)


# ── VIDEO 2 ──────────────────────────────────────────────────────────────────

def build_v2():
    TARGET = 49.0
    OUT = os.path.join(MEDIA, "V2_prequiz_final.mp4")

    print("\n" + "=" * 70)
    print("BUILDING V2 -> V2_prequiz_final.mp4 (49 s)")
    print("=" * 70)

    clip_paths = [
        os.path.join(VIDEO_DIR, "V2_01__Hook_.mp4"),
        os.path.join(VIDEO_DIR, "V2_02__CV_.mp4"),
        os.path.join(VIDEO_DIR, "V2_03__Abstract_.mp4"),
        os.path.join(VIDEO_DIR, "V2_04__Quiz_.mp4"),
        os.path.join(VIDEO_DIR, "V2_05__Diagn_stico_.mp4"),
        os.path.join(VIDEO_DIR, "V2_06__CTA_.mp4"),
    ]
    raw_durs = [get_duration(p) for p in clip_paths]
    print(f"Raw:  {[f'{d:.2f}s' for d in raw_durs]} total={sum(raw_durs):.2f}s")
    durs = calc_durations(raw_durs, TARGET)
    print(f"Adj:  {[f'{d:.2f}s' for d in durs]} total={sum(durs):.2f}s")

    texts_v2 = [
        ("Sabes cual es tu eslabon debil?",                        1,  5,  0.85, 34, "white"),
        ("CV - Posicionamiento - Networking - Mensaje",             8, 13,  0.85, 24, "white"),
        ("14 preguntas - 7 ejes - Resultado inmediato",           16, 21,  0.85, 28, "0x14B8A6"),
        ("No es un test de personalidad.",                        23, 27,  0.85, 30, "white"),
        ("Es un diagnostico ejecutivo real.",                     28, 32,  0.85, 30, "white"),
        ("Base - Operativo - Competitivo - Diferenciado",         35, 39,  0.85, 26, "white"),
        ("5 minutos - Resultado inmediato - Sin costo",           42, 47,  0.85, 28, "0x14B8A6"),
        ("Vale la pena ver la primera pregunta?",                 47, 49,  0.60, 30, "white"),
    ]
    print("\nGenerating text overlay PNGs...")
    text_overlays = generate_text_overlays(texts_v2, "v2")

    n_text = len(text_overlays)
    inputs = []
    for p in clip_paths:
        inputs += ["-i", p]
    inputs += ["-i", os.path.join(AUDIO_DIR, "vo_v2_prequiz.mp3")]
    inputs += ["-i", os.path.join(AUDIO_DIR, "music_v2.mp3")]
    for (path, _, _) in text_overlays:
        inputs += ["-loop", "1", "-i", path]
    idx_img_q  = 8 + n_text
    idx_img_r  = 8 + n_text + 1
    idx_logo   = 8 + n_text + 2
    inputs += ["-loop", "1", "-i", IMG_Q]
    inputs += ["-loop", "1", "-i", IMG_R]
    inputs += ["-loop", "1", "-i", LOGO_PATH]

    fc = []

    for i, (_, dur, raw) in enumerate(zip(clip_paths, durs, raw_durs)):
        fc.append(clip_filter(i, dur, raw))

    fc.append("".join(f"[c{i}]" for i in range(6)) + "concat=n=6:v=1:a=0[v_raw]")

    current = "v_raw"
    for i, (_, t_in, t_out) in enumerate(text_overlays):
        txt_idx = 8 + i
        next_lbl = f"vt{i}" if i < n_text - 1 else "v_text"
        fc.append(
            f"[{txt_idx}:v]format=rgba[tx{i}];"
            f"[{current}][tx{i}]overlay=x=0:y=0:"
            f"enable='between(t,{t_in},{t_out})'[{next_lbl}]"
        )
        current = next_lbl

    # Screenshot 1: quiz_pregunta at 22s-32s (50% wide, 25% from top, 80% opacity)
    img_w = int(W * 0.50)
    img_y = int(H * 0.25)
    fc.append(
        f"[{idx_img_q}:v]scale={img_w}:-1:flags=lanczos,"
        f"format=rgba,colorchannelmixer=aa=0.80[img_q2];"
        f"[v_text][img_q2]overlay=x=(W-w)/2:y={img_y}:"
        f"enable='between(t,22,32)'[v_img1]"
    )

    # Screenshot 2: quiz_resultado at 34s-41s
    fc.append(
        f"[{idx_img_r}:v]scale={img_w}:-1:flags=lanczos,"
        f"format=rgba,colorchannelmixer=aa=0.80[img_r2];"
        f"[v_img1][img_r2]overlay=x=(W-w)/2:y={img_y}:"
        f"enable='between(t,34,41)'[v_img2]"
    )

    # Logo at 44s-49s
    logo_y = int(H * 0.15)
    fc.append(
        f"[{idx_logo}:v]scale=280:-1:flags=lanczos,"
        f"format=rgba,colorchannelmixer=aa=0.90[logo2];"
        f"[v_img2][logo2]overlay=x=(W-w)/2:y={logo_y}:"
        f"enable='between(t,44,49)'[v_final]"
    )

    fc.append("[6:a]volume=1.0,atrim=duration=49[vo]")
    fc.append("[7:a]volume=0.12,afade=t=out:st=47.0:d=2.0,atrim=duration=49[music]")
    fc.append("[vo][music]amix=inputs=2:duration=first:dropout_transition=2[a_out]")

    filter_complex = ";\n".join(fc)
    fc_file = os.path.join(BASE, "fc_v2.txt")
    with open(fc_file, "w", encoding="utf-8") as fh:
        fh.write(filter_complex)

    run_ffmpeg(
        inputs
        + ["-/filter_complex", fc_file]
        + ["-map", "[v_final]", "-map", "[a_out]"]
        + ["-c:v", "libx264", "-preset", "medium", "-crf", "20"]
        + ["-c:a", "aac", "-b:a", "192k"]
        + ["-t", str(TARGET)]
        + ["-movflags", "+faststart"]
        + [OUT],
        desc="V2_prequiz_final.mp4 (49 s)"
    )

    if os.path.exists(OUT):
        dur  = get_duration(OUT)
        size = os.path.getsize(OUT) / 1024 / 1024
        print(f"\nOK  V2_prequiz_final.mp4")
        print(f"    Path:     {OUT}")
        print(f"    Duration: {dur:.2f}s  (target {TARGET}s)")
        print(f"    Size:     {size:.1f} MB")
    else:
        print("ERROR: output not created.")
        sys.exit(1)


# ── MAIN ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--v2", action="store_true", help="Also build V2 (requires V2 clips)")
    args = parser.parse_args()

    print("=" * 70)
    print("ExecForward Video Assembler")
    print("Method: PIL text overlays + ffmpeg compositing")
    print("=" * 70)

    # V1 required files
    required_v1 = (
        [os.path.join(VIDEO_DIR, f) for f in [
            "V1_01__Hook_Esfuerzo_Tracci_n_.mp4", "V1_02__Mercado_Abstract_.mp4",
            "V1_03__Giro_.mp4", "V1_04__Producto_Abstract_.mp4", "V1_05__CTA_.mp4",
        ]]
        + [os.path.join(AUDIO_DIR, f) for f in ["vo_v1_hero.mp3", "music_v1.mp3"]]
        + [IMG_Q, FONT_TTF]
    )

    # V2 required files (only checked if --v2 flag is used)
    required_v2 = (
        [os.path.join(VIDEO_DIR, f) for f in [
            "V2_01__Hook_.mp4", "V2_02__CV_.mp4", "V2_03__Abstract_.mp4",
            "V2_04__Quiz_.mp4", "V2_05__Diagn_stico_.mp4", "V2_06__CTA_.mp4",
        ]]
        + [os.path.join(AUDIO_DIR, f) for f in ["vo_v2_prequiz.mp3", "music_v2.mp3"]]
        + [IMG_Q, IMG_R]
    )

    required = required_v1 + (required_v2 if args.v2 else [])
    missing = [f for f in required if not os.path.exists(f)]
    if missing:
        print("MISSING FILES:")
        for f in missing:
            print(f"  {f}")
        sys.exit(1)

    print(f"All {len(required)} source files found. OK")

    build_v1()
    if args.v2:
        build_v2()

    # Cleanup temp PNG dir
    try:
        if os.path.exists(TMP_DIR):
            shutil.rmtree(TMP_DIR)
    except Exception as e:
        print(f"  (temp cleanup skipped: {e})")

    print("\n" + "=" * 70)
    print("DONE")
    targets = [("V1", "V1_hero_final.mp4")]
    if args.v2:
        targets.append(("V2", "V2_prequiz_final.mp4"))
    for label, fname in targets:
        path = os.path.join(MEDIA, fname)
        if os.path.exists(path):
            dur  = get_duration(path)
            size = os.path.getsize(path) / 1024 / 1024
            print(f"  [{label}] {path}")
            print(f"       Duration {dur:.2f}s | Size {size:.1f} MB")
    print("=" * 70)
