import { build } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import alias from 'esbuild-plugin-alias';
import { resolve } from 'path';
import fg from 'fast-glob';

// Use a glob pattern that matches only files ending with "Handler.ts"
// Adjust the pattern as needed for your project structure
const entryPoints = await fg('app/**/*Handler.ts');
const isWatchMode = process.argv.includes('--watch');

if (!entryPoints || entryPoints.length === 0) {
    console.log('No lambda handler TypeScript files found in app/.');
    process.exit(0);
}

const buildOptions = {
    entryPoints, // Bundle each matched file individually
    bundle: true, // Bundle all dependencies into a single file per entry point
    platform: 'node',
    target: 'node22', // Target Node.js 22
    outbase: 'app', // Preserve the directory structure relative to the "app" folder
    outdir: '.dist/app', // Output all files into the .dist folder
    minify: false,
    sourcemap: false,
    watch: isWatchMode
    ? {
        onRebuild(error) {
          if (error) {
            console.error('❌ Build failed:', error);
          } else {
            console.log('✅ Build succeeded');
          }
        },
      }
    : false,
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

build(buildOptions)
    .then(() => {
        console.log('TypeScript build successful');
    })
    .catch((error) => {
        console.log(entryPoints);
        console.log(resolve(__dirname, 'app'));
        console.error('TypeScript build failed:', error);
        process.exit(1);
    });