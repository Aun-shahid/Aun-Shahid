"""
Convert all PNGs in portfolio/public/projects to WebP
- Resize to 80% of original dimensions
- Quality: 82 (good balance of quality vs size)
- Keeps originals intact, outputs .webp alongside them
"""

from pathlib import Path
from PIL import Image

src_dir = Path(__file__).parent / "portfolio" / "public" / "projects"

converted = []
for png in sorted(src_dir.glob("*.png")):
    with Image.open(png) as img:
        new_w = int(img.width * 0.8)
        new_h = int(img.height * 0.8)
        resized = img.resize((new_w, new_h), Image.LANCZOS)
        out = png.with_suffix(".webp")
        resized.save(out, "WEBP", quality=82, method=6)
        old_kb = png.stat().st_size / 1024
        new_kb = out.stat().st_size / 1024
        saving = 100 - (new_kb / old_kb * 100)
        converted.append((png.name, old_kb, new_kb, saving))
        print(f"{png.name:40s}  {old_kb:7.1f} KB  →  {new_kb:7.1f} KB  ({saving:.0f}% saved)")

total_old = sum(r[1] for r in converted)
total_new = sum(r[2] for r in converted)
print(f"\nTotal: {total_old/1024:.1f} MB  →  {total_new/1024:.1f} MB  ({100 - total_new/total_old*100:.0f}% saved)")
