

/*
Middleware literally means anything you put in the middle of one layer of the software and another.
 Express middleware are functions that execute during the lifecycle of a request to the Express server.
  Each middleware has access to the HTTP request and response for each route (or path) it’s attached to. 
  In fact, Express itself is compromised wholly of middleware functions. 
  Additionally, middleware can either terminate the HTTP request or pass it on to another middleware function using next (more on that soon). 
  This “chaining” of middleware allows you to compartmentalize your code and create reusable middleware.


  REFERENCE: https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples
*/