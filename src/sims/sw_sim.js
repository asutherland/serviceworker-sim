'use strict';

const defineSim = require('sim-core/sim_definer');

return defineSim({
  // These get wrapped for each sim invocation to provide appropriately bound
  // context methods as part of the first argument so each sim is independent.
  constructors: {
    Caches: require('')
    Cache: require('./cache/api'),
  },
  processes: {
    cache: require('./cache/process'),
  },
  makeGlobals: function({ }) {

  }
});
