'use strict';

function CacheProcess(curried_ctx, name) {

}
CacheProcess.prototype = {
  queryCache: function(request, options, targetStorage) {
    /// Input
    /// * request, a Request object
    /// * options, a CacheQueryOptions object, optional

    /// * targetStorage, an array that has [Request, Response] pairs as its
    ///   elements, optional
    // => If specified, we end up querying targetStorage instead of the current
    // cache state/storage.  This is used by batchCacheOperations in order to
    // throw an InvalidStateError if a step finds that it interacts with a prior
    // step from the same batch.  See `addedRecords` in that algorithm.

    /// 1. Let requestArray be an empty array.
    /// 2. Let responseArray be an empty array.
    /// 3. Let resultArray be an empty array.

    /// 4. If options.ignoreMethod is false and request.method is neither "GET"
    /// nor "HEAD", return resultArray.
    // => Early bail if the request won't find any results.  The cache only
    // stores GET requests, which means that if we are paying attention to the
    // method, then only GET and its variant HEAD will succeed.

    /// 5. Let cachedURL and requestURL be null.
    /// 6. Let serializedCachedURL and serializedRequestURL be null.

  },

  /**
   * The defined asynchronous function to actually manipulate the cache state.
   */
  batchCacheOperations: function(operations) {
    /// 1. Let p be a promise resolved with no value.
    /// 2. Return the result of transforming p with a fulfillment handler that
    /// performs the following substeps in parallel:
    // => Boilerplate that this whole method is async and is invoked in a future
    // turn of the event loop as far as the caller can tell.  Also, thrown
    // exceptions will turn into a rejection.

    /// 2.1. Let itemsCopy be a new request to response map that is a copy of
    /// its context object’s request to response map.
    // => Checkpoints the state so that 2.4 can restore the cache state in case
    // of any exception being thrown.  This is necessary because the algorithm
    // is explicitly defined in terms of mutation.

    /// 2.2. Let addedRecords be an empty array.
    // => Tracks the running list of request/response pairs we have "put" into
    // the cache state so far so that step 2.3.2.3 can check to make sure the
    // current operation doesn't nonsensically conflict with a prior operation.

    /// 2.3. Try running the following substeps atomically:
    // => (Boilerplate akin to a try block, 2.4 is the catch block.)
    /// 2.3.1. Let resultArray be an empty array.
    /// 2.3.2. For each operation in operations with the index index:
    for (let operation of operations) {

      /// 2.3.2.1. If operation.type matches neither "delete" nor "put", throw a
      /// TypeError.
      /// 2.3.2.2. If operation.type matches "delete" and operation.response is
      /// not null, throw a TypeError.

      /// 2.3.2.3. If the result of running Query Cache algorithm passing
      /// operation.request, operation.options, and addedRecords as the
      /// arguments is not an empty array, throw an "InvalidStateError"
      /// exception.
      // => Make sure that this operation isn't nonsensical given prior
      // operations we've run as part of this batch.  Only "put" operations add
      // entries to "addedRecords" so this means redundant/clobbering puts and
      // deletions of just-put records will throw.  But a delete that would have
      // been clobbered by a subsequent put is fine (and semantically is
      // meaningful because the delete takes out both the fetching record and
      // the associated incumbent record, but the put would have left the
      // incumbent record intact.)

      /// 2.3.2.4. Let requestResponseArray be the result of running Query Cache
      /// algorithm passing operation.request and operation.options as the
      /// arguments.
      // => Find existing matches so we can delete them or update them as
      // appropriate.  Because the options can ignore search and vary, this may
      // return many records, some of which may be an inexact match for the
      // provided request.

      let existing = this.queryCache();
      /// 2.3.2.5. For each requestResponse in requestResponseArray:
      /// 2.3.2.5.1. If operation.type matches "delete", remove the
      /// corresponding fetching record from request to response map.
      // => Mutating delete case with odd control-flow/lack of hoisting.
      if (operation.type === 'delete') {

      }
      /// 2.3.2.6. If operation.type matches "put", then:
      else if (operation.type === 'put') {
        /// 2.3.2.6.1. If operation.response is null, throw a TypeError.
        /// 2.3.2.6.2. Let r be operation.request's associated request.
        let r = operation.request;
        /// 2.3.2.6.3. If r’s url’s scheme is not one of "http" and "https",
        /// throw a TypeError.
        /// 2.3.2.6.4. If r’s method is not `GET`, throw a TypeError.
        /// 2.3.2.6.5. If operation.options is not null, throw a TypeError.
      }
    }


    /// 2.4. And then, if an exception was thrown, then:
    /// 2.4.1. Set the context object’s request to response map to itemsCopy.
    /// 2.4.2. Throw the exception
    // => The catch/finally block if anything threw inside 2.3's children.
    // Point 2.4.1 rolls back to the original state saved off in 2.1 and 2.4.2
    // re-throws the exception that will be converted into a rejection since
    // this all happens under the guise of 2 which is a fulfillment handler.
  },
};
