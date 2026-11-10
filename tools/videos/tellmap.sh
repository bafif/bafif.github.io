#!/usr/bin/env bash
# Records TellMAP's video (public/video/tellmap.mp4 and its poster) without a monitor: Godot runs tellmap.gd inside
# the cage compositor in headless mode, like ~/tmap/tools/captura.sh, with its user data in a throwaway folder so
# the app's real settings stay untouched. Needs godot 4.7, cage, ffmpeg and magick.
#   tools/videos/tellmap.sh [path to the TellMAP checkout, ~/tmap by default]
set -euo pipefail
raiz="$(cd "$(dirname "$0")/../.." && pwd)"
tmap="${1:-$HOME/tmap}"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/run" "$tmp/datos" "$tmp/config" "$tmp/cuadros"
export CUADROS="$tmp/cuadros" XDG_RUNTIME_DIR="$tmp/run" XDG_DATA_HOME="$tmp/datos" XDG_CONFIG_HOME="$tmp/config"
export WLR_BACKENDS=headless WLR_LIBINPUT_NO_DEVICES=1
export WLR_RENDERER="${WLR_RENDERER:-gles2}" WLR_RENDER_DRM_DEVICE="${WLR_RENDER_DRM_DEVICE:-/dev/dri/renderD128}"
timeout 240 cage -- godot --path "$tmap" --display-driver wayland --fixed-fps 30 -s "$raiz/tools/videos/tellmap.gd"
# cage's headless output leaves the window 683 pixels high; H.264 wants an even height.
ffmpeg -v error -y -framerate 30 -i "$tmp/cuadros/%05d.jpg" -vf "crop=1280:682:0:0,format=yuv420p" \
  -c:v libx264 -preset slow -crf 26 -movflags +faststart -an "$raiz/public/video/tellmap.mp4"
magick "$tmp/cuadros/00000.jpg" -crop 1280x682+0+0 +repage -quality 80 "$raiz/public/video/tellmap.webp"
ls -la "$raiz/public/video/tellmap.mp4"
