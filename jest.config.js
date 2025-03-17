module.exports = {
  preset: 'ts-jest', // If you want to use TypeScript for the Jest configuration itself
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testRegex: '\\.(test|spec)\\.[t]s$', // Regex for test files
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: ['app/directory/**/*.{ts,tsx}', '!**/node_modules/**', '!**/*.d.ts', '!**/I*'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/app/$1', // Map @app to the project root
    '^@utils/(.*)$': '<rootDir>/app/utils/$1', // Map @app to the project root
  },
};
