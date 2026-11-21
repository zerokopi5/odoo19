# Dev container for the odoo19 video workspace.
# Node 22 + ffmpeg + opencode + everything Remotion's headless Chrome needs.
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

# opencode (v2) installed system-wide so it works for any shell/user.
RUN curl -fsSL https://opencode.ai/v2/install | bash \
    && install -m 755 /root/.opencode/bin/opencode /usr/local/bin/opencode \
    && if [ -f /root/.opencode/bin/opencode2 ]; then \
         install -m 755 /root/.opencode/bin/opencode2 /usr/local/bin/opencode2; \
       fi \
    && opencode --version

USER node
WORKDIR /workspaces/odoo19
