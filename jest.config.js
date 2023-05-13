/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns:['/node_modules/'],
  testMatch: ['**/test/*.[tj]s?(x)']
};
//ts-jset,jest,@type/jest npx ts-jest config:init