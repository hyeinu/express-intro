const PORT = 8000;
const express = require('express')

const app = express();

// the request will go through each thing until it hits the request

//method: GET
//url: /
//middleware (req, res)

app.use((req, res, next)=>{
  //ALL methods will go thru this method before going to other routes
  //allows us to have general request at the top
  //all the following methods you want to influence MUST be after
  //example: validation middleware (make sure the data is good to pass thru) authentiation middleware to make sure they are authorized
  console.log(`${req.method} ${req.url}`)
  next();

});

app.get('/', (req, res, next) =>{

  /*//the req.query will return an object from a url/person?name=ben&eye-color=blue
  //this will return {name: ben, eye-color:blue}
  //console.log('req.query:', req.query)*/

  /*req.flavor = 'Bluebery;' //added the category of blueberry */
  next(); //will trigger the next piece in the middleware

}, (req, res, next) =>{


  console.log('req:', req.flavor)
  res.send(`Get /\n`);

});

app.get('/timestamp', (req,res) =>{

  //if you try to send a number then it thinks its a STATUS CODE
  res.send({ timestamp: Date.now() });

});

//same as a server.listen
/* app.listen, what's actually is doing:
const http = require('http');
let server = http.createServer(app)
server.listen

//sometimes is good to separate the server and app because server is listening and app is actually handling the request.
*/

app.listen(PORT, err => {
  console.log(err || `Server is listening on port ${PORT}`)
});

//////////////////////////
/* Middleware - function
  same function signature (what arguments it takes)
  Middleware passes through the req and res and does something along the way.
  (you can put information within the request and respones to change them for the NEXT function)
  (it does not HAVE TO send next (can exit the request by res.send("not authorized to be here")))
  route specific - instructions
  function (req, res, next){}
  ** next is a callback (function) triggers the next piece of the middleware

}


*/
