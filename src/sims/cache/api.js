'use strict';

/**
 * ## Fetch-interaction ##
 *
 * addAll (and add by way of addAll) trigger fetch ("in parallel").  Like Gecko,
 * we perform the fetch in the current context and otherwise implement
 **/

function Cache(curried_ctx, name) {
  this.name = name;
}
Cache.prototype = {
  match() {

  },

  matchAll() {

  },

  add() {

  },

  addAll() {

  },

  put(request, response) {
    /// 1. Let r be null.
    // => temporary to hold a normalized version of "request" so that it's a
    // proper Request and has no fragment.

    /// 2. If request is a Request object, then:
    /// 2.1. Set r to request’s request.
    /// 2.2. If r’s url’s scheme is not one of "http" and "https", or r’s method
    /// is not `GET`, return a promise rejected with a TypeError.
    /// 3. Else if request is a string, then:
    /// 3.1. Set r to the associated request of the result of invoking the
    /// initial value of Request as constructor with request as its argument. If
    /// this throws an exception, return a promise rejected with that exception.
    /// 3.2. If r’s url’s scheme is not one of "http" and "https", return a
    /// promise rejected with a TypeError.
    // => The actual normalization, plus enforce that Caches only store GETs.
    /// 4. Set r’s url’s fragment to null.
    // =>

    this._emit({
      queue: 'cache',
      cache: this.name,

    });
  },

  delete() {

  },

  keys() {

  }
};

return Cache;
