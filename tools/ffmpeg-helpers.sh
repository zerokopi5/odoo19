#!/usr/bin/env bash
# ffmpeg helpers for the odoo19 video workspace.
# Usage: source tools/ffmpeg-helpers.sh

# Shrink an MP4 for social upload (targets ~4-6 Mbps at 1080p).
vcompress() {
  local in="$1" out="${2:-${1%.*}-small.mp4}"
  ffmpeg -y -hide_banner -loglevel error -i "$in" \
    -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p \
    -c:a aac -b:a 128k -movflags +faststart "$out"
  echo "-> $out"
}

# MP4 -> optimized GIF (fps + width configurable).
vgif() {
  local in="$1" out="${2:-${1%.*}.gif}" fps="${3:-15}" width="${4:-720}"
  ffmpeg -y -hide_banner -loglevel error -i "$in" \
    -vf "fps=${fps},scale=${width}:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" \
    -loop 0 "$out"
  echo "-> $out"
}

# Grab a cover/thumbnail frame at a timestamp (seconds).
vcover() {
  local in="$1" out="${2:-cover.jpg}" ts="${3:-1}"
  ffmpeg -y -hide_banner -loglevel error -ss "$ts" -i "$in" -frames:v 1 -q:v 2 "$out"
  echo "-> $out"
}

# Contact sheet: 1 frame every N seconds into out/thumbs/.
vthumb() {
  local in="$1" dir="${2:-thumbs}" every="${3:-1}"
  mkdir -p "$dir"
  ffmpeg -y -hide_banner -loglevel error -i "$in" \
    -vf "fps=1/${every},scale=480:-1" "$dir/frame-%03d.jpg"
  echo "-> $dir/"
}

# Print duration, resolution, codec, bitrate.
vprobe() {
  ffprobe -v error -show_entries \
format=duration,size,bit_rate:stream=codec_name,width,height,r_frame_rate \
    -of default=noprint_wrappers=1 "$1"
}

# Concatenate same-codec MP4s (file list order as given).
vconcat() {
  local out="$1"; shift
  local list; list="$(mktemp --suffix=.txt)"
  for f in "$@"; do printf "file '%s'\n" "$(realpath "$f")" >> "$list"; done
  ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i "$list" -c copy "$out"
  rm -f "$list"
  echo "-> $out"
}
