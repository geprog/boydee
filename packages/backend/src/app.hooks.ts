import { authenticate } from './hooks/authenticate';
import { error, log } from './hooks/index';

// Application hooks that run for every service
export default {
  before: {
    all: [authenticate],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [log],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [log, error],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
