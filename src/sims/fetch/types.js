define(function() {
'use strict';

function Request(url, init) {
  this.url = url;
  this.varied = (init && init.varied) || null;
}
Request.fromJSON = function(obj) {
  return new Request(obj.url, { varied: obj.varied });
};
Request.prototype = {
  toJSON: function() {
    return {
      type: 'Request',
      url: this.url,
      varied: this.varied
    };
  }
};

function Response(body, init) {
  this.body = body;
  this.varies = (init && init.varies) || false;
}
Response.fromJSON = function(obj) {
  return new Response(obj.body, { varies: obj.varies });
};
Response.prototype = {
  toJSON: function() {
    return {
      type: 'Response',
      body: this.body,
      varies: this.varies
    };
  }
};

return {
  Request,
  Response
};
});
