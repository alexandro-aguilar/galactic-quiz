#!/bin/bash

set -e

LAYERS_DIR="./iac/modules/layers"

echo "🔍 Looking for layers in $LAYERS_DIR..."

for layer in "$LAYERS_DIR"/*; do
  if [ -d "$layer/nodejs" ]; then
    echo "📦 Building layer: $(basename "$layer")"
    (cd "$layer" && yarn workspaces focus --production)
  else
    echo "⚠️ Skipping $(basename "$layer") — no nodejs folder"
  fi
done

echo "✅ All applicable layers have been built." 