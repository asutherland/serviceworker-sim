Right now this is just a scratchpad where I write pseudo-code with what amount
to annotated specs (in the comments) in an attempt to understand the specs and
not fall asleep in the process.

Originally I was trying to implement a toy simulation as described below, but I
don't have the time to follow through on the dream.

## Original Goals ##

Toy simulations of Service Worker-related APIs with the intent of aiding in
understanding and discussion of concurrency and ordering-related scenarios.  In
other words, nuances not related to concurrency are discarded.

The following radical simplifications are made:
* URLs are just opaque strings.  There's no concept of origins/domains/etc.  
  Super short strings are used to avoid using up too much screen real-estate.
* Request objects are characterized by:
  * String URL.
  * Made-up "varied" header.  In the real world this would likely be the
    "Accepts" header, but the code is more self-describing this way.
* Responses are characterized only by their:
  * String URL
  * Simplified boolean "varies" value which indicates whether varied is used or
    not.  When true, this would be like "Vary: Accept" if our "varied" was
    Accept.
  * Simplified state: "nothing", "headers", "body" meaning respectively that
    we don't have the headers yet, we now have the headers, we now have the
    entirety of the body.  The minimal set of states meaningful to the APIs and
    potential consumers.
  * bodyRev: null until the state is "body", at which point it's a number that
    represents the revision of the contents from the server.  So the initial
    request might fetch revision 1, then a subsequent fetch from the server
    would fetch revision 2.


The simulations are built on a communicating sequential processes model where:
* Consumer API calls generate (immutable) messages that are dispatched to a
  named queue associated with a process that consumes that queue.
* Processes are fed their queued messages one-by-one at the discretion of the
  coordinator.  The processes' state is stored as a series of immutable
  snapshots.  The processing function is given the current state, the
  received message, a mutate() function that takes a mutation to apply to the
  state and return the new state, and an enqueue() function.
