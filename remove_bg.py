#!/usr/bin/env python3
"""
remove_bg.py — Remove white backgrounds from yarn cone images using rembg (U2Net).
Saves transparent PNGs to public/images/yarns/transparent/

U2Net is a neural-net saliency detector, so it segments by SHAPE/DEPTH, not colour.
This means white yarn (white.png) is preserved correctly — it detects the yarn cone
as the foreground subject regardless of its colour.
"""

import sys
import os
from pathlib import Path

try:
    from rembg import remove
    from PIL import Image
    import io
except ImportError as e:
    print(f"ERROR: Missing dependency — {e}")
    print("Run: pip3 install rembg pillow")
    sys.exit(1)

# ─── Paths ───────────────────────────────────────────────────────────────────
SCRIPT_DIR   = Path(__file__).parent
YARN_DIR     = SCRIPT_DIR / "public" / "images" / "yarns"
OUT_DIR      = YARN_DIR / "transparent"

# Only the 6 individual cone images that need background removal.
# black-yellow.png and red-yellow.png are multi-cone compositions — leave untouched.
TARGETS = [
    "green.png",
    "blue.png",
    "white.png",
    "red.png",
    "orange.png",
    "yellow.png",
]

def process_image(src_path: Path, dst_path: Path) -> None:
    print(f"  Processing: {src_path.name} ...", end=" ", flush=True)
    with open(src_path, "rb") as f:
        input_bytes = f.read()
    # rembg.remove returns PNG bytes with alpha channel
    output_bytes = remove(input_bytes)
    img = Image.open(io.BytesIO(output_bytes)).convert("RGBA")

    # Optional: very light clean-up pass — trim any near-opaque fringe pixels
    # that may appear around the edges from the model. We do a gentle alpha
    # threshold: pixels with alpha < 30 are fully transparent.
    import numpy as np
    arr = np.array(img)
    mask = arr[:, :, 3] < 30
    arr[mask] = [0, 0, 0, 0]
    img = Image.fromarray(arr)

    img.save(dst_path, "PNG")
    print(f"DONE → {dst_path.name}")

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"\nOutput directory: {OUT_DIR}\n")

    missing = []
    for name in TARGETS:
        src = YARN_DIR / name
        if not src.exists():
            missing.append(name)

    if missing:
        print(f"WARNING: These source files not found: {missing}")

    failed = []
    for name in TARGETS:
        src = YARN_DIR / name
        if not src.exists():
            continue
        dst = OUT_DIR / name  # same filename, transparent version
        try:
            process_image(src, dst)
        except Exception as e:
            print(f"FAILED: {e}")
            failed.append(name)

    print(f"\n✓ Done. {len(TARGETS) - len(failed) - len(missing)} images processed.")
    if failed:
        print(f"✗ Failed: {failed}")

if __name__ == "__main__":
    main()
