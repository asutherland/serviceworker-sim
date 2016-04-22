define(function(require) {



function mainFetch(request, { cors, recursive }) {
  // 1.
  let response = null;
  // 2.
  if (request.localOnly && !request.url.isLocal) {
    response = Response.makeNetworkError();
  }
  // 3.
  reportContentSecurityPolicyViolations(request);
  // 4. Upgrade request to a potentially secure URL, if appropriate.
  // TODO
  // 5. ~various blockings
  // TODO
  // 6.
  if (request.referrerPolicy === '' &&
      request.client !== null) {
    request.referrerPolicy = request.client.referrerPolicy;
  }
  // 7.
  if (request.referrerPolicy === '') {
    request.referrerPolicy = 'no-referrer-when-downgrade';
  }
  // 8.
  if (request.referrer !== 'no-referrer') {
    request.referrer = determineRequestsReferrer(request);
  }
  // 9. ~HSTS upgrade junk
  // TODO

  // ...
}

return {
  mainFetch
};
});
