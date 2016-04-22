define(function(require) {

function determineRequestsReferrer(request) {
  // 1.
  let policy = '';

  // 2.
  let referrerSource;
  if (request.is3xxRedirect) {
    referrerSource = request.referrer;
    if (referrerSource === null) {
      return 'no referrer';
    }
    policy = request.redirectResponse.referrerPolicy;
  } else { // 3.
    // 3.1.
    let environment = request.client;
    // 3.2.
    if (request.initiator instanceof Element &&
        request.initiator.hasAttribute('referrerpolicy')) {
      policy = request.initiator.getAttribute('referrerpolicy');
    } else {
      policy = environment.referrerPolicy;
    }

    // 3.3.
    if (request.referrer instanceof URL) {
      referrerSource = request.referrer;
    } else {
      let document;
      // 3.3.1
      if (environment instanceof DocumentEnvironment) {
        document = environment.responsibleBrowsingContext.activeDocument;
      } else if (environment instanceof WorkerEnvironment) { // 3.3.2.
        let source = environment.apiReferrerSource;
        if (source instanceof URL) {
          referrerSource = source;
        } else {
          document = source;
        }
      }
      // 3.3.3.
      if (document) {
        // 3.3.3.1.
        if (!isSchemeHostPort(document.origin)) {
          return 'no referrer';
        }
        // 3.3.3.2.
        // => (srcdoc documents by their nature are raw embedded content and
        // cannot have a referrer on their own, so walk on up until we get to
        // the parent which has one.)
        while (document.isSrcDocDocument) {
          document = document.browsingContext.parentBrowsingContext.document;
        }
        // 3.3.3.3.
        referrerSource = document.url;
      }
    }
  }

  // 4.
  let referrerURL = stripForUseAsReferrer(referrerSource, {originOnly: false});
  // 5.
  let referrerOrigin = stripForUseAsReferrer(referrerSource, {originOnly: true});

  switch (policy) {
    case 'no referrer': {
      return 'no referrer';
    }
    case 'origin only': {
      return referrerOrigin;
    }
    case 'unsafe url': {
      return referrerURL;
    }
    case 'origin when cross-origin': {
      if (request.isCrossOrigin) {
        return referrerOrigin;
      }
      return referrerURL;
    }
    case 'no referrer when downgrade':
    case '':
      if (request.is3xxRedirect) {
        if (request.originalRequest.isTLSProtected &&
            request.url.origin.isInsecure) {
          return 'no referrer';
        }
        return referrerURL;
      } else {
        // specbug? environment is not defined here and I think is implicitly
        // scoped like so above, so pulling out again.
        let environment = request.client;
        if (environment.isTLSProtected &&
            request.url.origin.isInsecure) {
          return 'no referrer';
        }
        return referrerURL;
      }
  }
}

return {
  determineRequestsReferrer
};
});
