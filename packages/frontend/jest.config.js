// INFO: disable linter errors for node requires in config file
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig');
// eslint-disable-next-line no-undef
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  },
  automock: false,
  setupFiles: ['<rootDir>/tests/unit/__setup__/fetch.ts'],
};
