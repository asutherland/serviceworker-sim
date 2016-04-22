define(function(require) {
'use strict';

const defineSim = require('sim-core/sim_definer');
const { Request, Response } = require('./fetch/types');

return defineSim({
  types: {
    Request,
    Response
  },
  // These get wrapped for each sim invocation to provide appropriately bound
  // context methods as part of the first argument so each sim is independent.
  constructors: {
    Caches: require('./cache_storage/api'),
    Cache: require('./cache/api'),
  },
  // These are functions that get a curried context first argument.
  functions: {

  },
  // Defines the agents/sequential processes that receive messages emitted by
  // the various classes/functions/etc.
  processes: {
    cache: require('./cache/process'),
  },
  // The wrapped constructors and functions get bound and provided as an arg
  // object to be propagated into what should actually be exposed to the
  // simulation.
  makeGlobals: function({ Caches }) {
    return {
      Request,
      Response,
      caches: new Caches()
    };
  }
});
});
