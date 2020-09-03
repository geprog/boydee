// INFO: disable linter errors for node requires in config file
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/tests'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
