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
  exclude: ['.yarn/**']
}

export default esbuildBundlingConfig;