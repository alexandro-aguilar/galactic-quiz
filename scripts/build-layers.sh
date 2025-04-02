#!/bin/bash

set -e

LAYERS_DIR="./iac/modules/layers"

if [ ! -d "$LAYERS_DIR" ]; then
  echo "❌ Layers directory not found: $LAYERS_DIR"
  exit 1
fi

echo "🔍 Scanning layers in $LAYERS_DIR..."

for layer in "$LAYERS_DIR"/*; do
  if [ -d "$layer" ]; then
    NODEJS_DIR="$layer/layer/nodejs"

    if [ -d "$NODEJS_DIR" ]; then
      echo "📦 Installing production dependencies for layer: $(basename "$layer")"
      (cd "$layer/layer/nodejs" && yarn workspaces focus --production)
    fi
  else
    echo "⏭️ Skipping non-directory item: $(basename "$layer")"
  fi
done

echo "✅ Layer preparation complete."