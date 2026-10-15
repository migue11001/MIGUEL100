#!/bin/sh
# Gallery thumbnails: turns every drawing (PDF/PNG/JPG) in thumbs/ into an 800px JPG
# in thumbs/out/<name>.jpg, ready to upload to Supabase images/miniaturas/.
# thumbs/ is git-ignored. Uses sips (built into macOS).
cd "$(dirname "$0")/../thumbs" || exit 1
mkdir -p out
for f in *.pdf *.png *.jpg *.jpeg; do
    [ -e "$f" ] || continue
    name="${f%.*}"
    sips -s format jpeg -s formatOptions 85 --resampleWidth 800 "$f" --out "out/$name.jpg" >/dev/null 2>&1 \
        && echo "✓ out/$name.jpg" || echo "✗ $f"
done
