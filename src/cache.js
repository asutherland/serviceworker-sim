let Fetch = Sim.defineAsyncEvent({
  states: ['pending', 'success']
});

let Cache = Sim.defineStatefulMap({
  states: ['committed', 'perceived', 'pending']
})

let StashInCache = Sim.defineStrategies({

})

var blah = {
  name: 'Cache',
  methods: {
    match: {

    },
    matchAll() {

    },
    add(req) {
      this.addAll([req]);
    },
    addAll(reqs) {
      reqs.map((req) => {

      });
    },
    put() {

    },
    delete() {

    },
    keys() {

    }
  }
};

cache.put('a', fetch('a'));
cache.put('a', fetch('a'));

Sim.
