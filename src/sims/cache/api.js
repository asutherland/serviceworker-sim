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
    // => The spec says fetch URLs discard the fragment, so there's no point
    // keeping this around.  However, the spec is possibly changing on this
    // point.
    /// 5. If response’s associated response’s header list contains a header
    /// named `Vary`, then:
    /// 5.1. Let varyHeaders be the array containing the elements corresponding
    /// to the field-values of the Vary header.
    /// 5.2.  For each f in varyHeaders:
    /// 5.2.1. If f matches "*", return a promise rejected with a TypeError.
    // => A vary response of "*" means that the server is caching based on
    // things so complex and unknowable that the client can't know.  This is
    // rarely used since it means things are uncacheable and in those cases it
    // makes more sense to just indicate that using the more appropriate cache
    // headers.  But we do throw because it makes vary matching impossible.
    /// 6. If response is disturbed or locked, return a promise rejected with a
    /// TypeError.
    // => Check that the response hasn't been read from/canceled (disturbed) or
    // locked for reading by a reader (locked).  This ensures that the entirety
    // of the stream is available for reading so we can write it to disk.
    /// 7. Let newResponse be a new Response object associated with response’s
    /// associated response and a new Headers object whose guard is response’s
    /// Headers' guard.
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
