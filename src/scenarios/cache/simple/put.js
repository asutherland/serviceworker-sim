const { Caches }

return function*({ caches }) {
  let cache = yield caches.open('cash');
  let request = new Request('foo');
  let response = yield fetch(request);
  yield cache.put(request, response);
};
