Fetch is modeled so that each request moves through 3 states based on the
visibility of the consumer of the stream.
1. nothing: We don't have the headers yet.
2. headers: We have the headers.
3. body: We have the body.
