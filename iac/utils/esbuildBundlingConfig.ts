const esbuildBundlingConfig = {
  externalModules: [
    'aws-sdk',
    '@aws-sdk',
    'inversify',
    'reflect-metadata',
  ], // Exclude specific modules from bundling
  nodeModules: [],     // Include specific modules in the bundle
  target: 'node22',    // Set the target environment for esbuild
  sourceMap: true,
  sourcesContent: false,
  exclude: ['*'],
  commandHooks: {
    beforeBundling(): string[] {
      return [];
    },
    beforeInstall(): string[] {
      return [];
    },
    afterBundling(inputDir: string, outputDir: string): string[] {
      return [
        // Remove .yarn directory from the output
        `rm -rf ${outputDir}/.yarn`,
        `rm -rf ${outputDir}/yarn.lock`,
        `rm -rf ${outputDir}/package.json`,
      ];
    }
  },
}

export default esbuildBundlingConfig;