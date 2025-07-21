#!/bin/bash

set -e

LAYERS_DIR="./iac/modules/layers"
DIST_DIR="./.dist/layers"

if [ ! -d "$LAYERS_DIR" ]; then
  echo "❌ Layers directory not found: $LAYERS_DIR"
  exit 1
fi

mkdir -p "$DIST_DIR"

echo "🔍 Scanning layers in $LAYERS_DIR..."

for layer in "$LAYERS_DIR"/*; do
  if [ -d "$layer" ]; then
    NODEJS_DIR="$layer/layer/nodejs"

    if [ -d "$NODEJS_DIR" ]; then
      echo "📦 Installing production dependencies for layer: $(basename "$layer")"
      (cd "$layer/layer/nodejs" && yarn workspaces focus --production)

      echo "🛠️ Copying built layer $(basename "$layer") to $DIST_DIR"
      TARGET_DIR="$DIST_DIR/$(basename "$layer")"
      mkdir -p "$TARGET_DIR"
      cp -r "$layer/layer" "$TARGET_DIR/"

      rm -rf "$NODEJS_DIR/node_modules"
      rm -rf "$NODEJS_DIR/.yarn"
    fi
  else
    echo "⏭️ Skipping non-directory item: $(basename "$layer")"
  fi
done

echo "✅ Layer preparation complete."