/* eslint-disable @typescript-eslint/no-require-imports */
const { build, context } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const alias = require('esbuild-plugin-alias');
const { resolve } = require('path');
const fg = require('fast-glob');
const chokidar = require('chokidar');

async function main() {
  const entryPoints = await fg('app/**/*Handler.ts');
  const isWatchMode = process.argv.includes('--watch');
  console.log(`isWatchMode: ${isWatchMode}`);

  if (!entryPoints || entryPoints.length === 0) {
    console.log('No lambda handler TypeScript files found in app/.');
    process.exit(0);
  }

  const buildOptions = {
    entryPoints,
    bundle: true,
    platform: 'node',
    target: 'node22',
    outbase: 'app',
    outdir: '.dist/app',
    minify: false,
    sourcemap: isWatchMode,
    logLevel: 'info',
    plugins: [
      nodeExternalsPlugin({ packagePath: './package.json' }),
      alias({
        '@app': resolve(__dirname, 'app'),
        '@test': resolve(__dirname, 'test'),
        '@core': resolve(__dirname, 'app/core'),
        '@root': resolve(__dirname, '.'),
      })
    ],
  };

  try {
    if (isWatchMode) {
      const ctx = await context(buildOptions);
      await ctx.watch();
      chokidar.watch('app/**/*').on('change', async (filePath) => {
        console.log(`🔄 File changed: ${filePath}`);
        await ctx.rebuild();
        console.log('✅ Rebuild complete');
      });
    } else {
      await build(buildOptions);
      console.log('✅ TypeScript build successful');
    }
  } catch (error) {
    console.log(entryPoints);
    console.log(resolve(__dirname, 'app'));
    console.error('❌ TypeScript build failed:', error);
    process.exit(1);
  }
}

main();