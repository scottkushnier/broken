### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

_There are two basic ways, through 'promises' and through 'async' functions._

_A 'Promise' is a construct that allows a developer to initiate a piece of code that may not return a value for an extended length of time. The developer specifies what code should execute when the promise is finally resolved (or encounters an error). In the meantime, execution continues with code subsequent to the creation of the promise._

_The 'async' keyword is associated with a function and indicates that the function is to run asynchronously, meaning that the function runs "on its own", and execution continues subsequent to the function call without waiting for a result (return value or error). It makes the asynchronous nature of the function explicit - even though the mechanics are still carried out through the use of promises. When execution should not continue until the async function finishes, a developer will use an 'await' keyword to signal that execution should be suspended until the the async function finishes._

_For example, a developer may need three things to happen before a fourth - but those three could be done "in parallel" (i.e. asynchronously). If "retrieve" were an async function, then a developer could write as follows:_

	pa = retrieve('a');    // kick off requests for a,b,c
	pb = retrieve('b');
    pc = retrieve('c');
    a = await(pa);       // then wait until all three are present
    b = await(pb);
    c = await(pc);
    // now we can do something else that depends on having all of a,b,c


- What is a Promise?

_A 'promise' is a Javascript object that represents a request for some code to run. It includes fields for returned value(s) and error information that will be filled out when available. One can 'await' a promise inside an async function. One can also specify code that should be run upon resolution of a promise, either with returned information or error conditions. The mechanics of how the code activated by a promise shares processing time with code in the original execution stream is handled by a web browser event handler or by the node.js implementation._

- What are the differences between an async function and a regular function?

_An async function returns a promise. Execution continues without waiting for the result of the asynchronous function until or unless an await on that promise is encountered. Non-async functions are "synchronous", that is they must finish before subsequent code is executed._

- What is the difference between Node.js and Express.js?

_Node.js is an implementation of a code interpreter than can parse and execute Javascript without requiring a web browser (before Node.js, how all Javascript used to be run).
_Express.js_ is a web server framework that allows a developer to write a web server application in Javascript - similar to how Flask supports Python code._

- What is the error-first callback pattern?

_Many times in Node.js a library function is asynchronous and the developer specifies a callback which defines what happens once the asynchronous function returns (or throws an error). The arguments to this callback are usually of the form (error, returnValue). By convention, the error is given as the first argument._

- What is middleware?

_Middleware is software that runs between the request and response in a call to a web app. It comes handy for logging, authentication, and any other kind of functionality that a developer would prefer to not replicate over many different routes._

- What does the `next` function do?

_In Express.js, by default, only one route will match and then execute. If one needs
the routes handler to possibly examine other routes or execute some further functionality, then 'next' is called. This will result in subsequent routes tested for matches or other code to be executed. For example, if there is error handling code, if an error is detected, then one needs to call 'next' so that the error handling code can executed. Otherwise, the express routes handler will be happy to finish the route and never execute the code designed for error handling._

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

_Awaiting each call in turn could be improved by making the three call asynchronously, then waiting until they are all done. For example, in the code above, getting data for Joel and Matt must wait until we have data on Elie. There's no reason for that since there are probably no dependencies involved._

_There is a lot of duplication of code and data. A "getUser" function would come in handy. It would be close to a one-liner, but would make getUsers much more efficient._

_Doing the same thing for three different users could be done in a loop or a mapping function._

_Using a variable like 'username' (set to 'elie', then 'joelburton', etc.) would make more sense that a different variable for each different user._

_What's with 'mmmaaatttttt'? Who allowed such a username?_
