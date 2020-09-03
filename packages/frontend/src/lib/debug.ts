import Debug from 'debug';

import pkg from '@/../package.json';

// add package-name as prefix to debugger namespace
export default (namespace: string): Debug.Debugger => Debug(`${pkg.name}:${namespace}`);

export const localDebug = (namespace: string, formatter: string, ...args: unknown[]): void =>
  Debug(`${pkg.name}:${namespace}`)(formatter, args);
