#!/usr/bin/env bash
# Install opencode v2 into the codespace. Safe to re-run; exits early if present.
# Runs from postCreateCommand, never from the image build, so a slow download
# cannot stall container startup.
set -euo pipefail

if command -v opencode >/dev/null 2>&1; then
  echo "opencode already installed: $(opencode --version)"
  exit 0
fi

echo "Installing opencode v2..."
curl -fsSL https://opencode.ai/v2/install | bash

BIN_DIR="$HOME/.opencode/bin"
export PATH="$BIN_DIR:$PATH"

install_bin() {
  local name="$1"
  [ -f "$BIN_DIR/$name" ] || return 0
  if [ -w /usr/local/bin ]; then
    install -m 755 "$BIN_DIR/$name" "/usr/local/bin/$name" && return 0
  fi
  if command -v sudo >/dev/null 2>&1 && sudo -n true 2>/dev/null; then
    sudo install -m 755 "$BIN_DIR/$name" "/usr/local/bin/$name" && return 0
  fi
  echo "note: $name stays in $BIN_DIR (no writable /usr/local/bin)" >&2
  return 0
}

install_bin opencode
install_bin opencode2

# Persist PATH for interactive shells (bashrc is user-owned, no sudo needed).
if ! grep -q 'opencode/bin' "$HOME/.bashrc" 2>/dev/null; then
  printf '\nexport PATH="$HOME/.opencode/bin:$PATH"\n' >> "$HOME/.bashrc"
fi

opencode --version
