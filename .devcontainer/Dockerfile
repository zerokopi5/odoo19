# Dev container for the odoo19 video workspace.
# Node 22 + ffmpeg + everything Remotion's headless Chrome needs.
# opencode is installed after create (scripts/install-opencode.sh) so a slow
# binary download can never block the container from starting.
FROM mcr.microsoft.com/devcontainers/typescript-node:22-bookworm

USER root
ENV DEBIAN_FRONTEND=noninteractive

# ffmpeg for post-processing, plus the shared libs Chrome Headless Shell needs.
RUN apt-get update && apt-get install -y --no-install-recommends \
        ffmpeg \
        ca-certificates curl unzip jq git \
        libnss3 libnspr4 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 \
        libgbm1 libasound2 libpulse0 libcups2 libdrm2 libexpat1 \
        libx11-6 libxcb1 libxcomposite1 libxdamage1 libxext6 libxfixes3 \
        libxkbcommon0 libxrandr2 libxtst6 libpango-1.0-0 libcairo2 \
        libglib2.0-0 libgdk-pixbuf-2.0-0 libgtk-3-0 \
        fonts-liberation fonts-noto-color-emoji \
    && rm -rf /var/lib/apt/lists/*

USER node
WORKDIR /workspaces/odoo19
