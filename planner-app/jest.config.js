/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/test/tsconfig.json',
    },
  },
  moduleNameMapper: {
    "axios": "axios/dist/node/axios.cjs"
  },
};