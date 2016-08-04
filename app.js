const PORT = 8000;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Cat = require('./models/cat');
const path = require('path');

const app = express();

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
//makes it possible to have other objects when extended is false
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static('public'))

/*
  res.sendFile //read and send file is part of 'express'
  app.use(express.static('public')) //static routing looks in public for that file
  //try to do it with promises ".then()" instead of callbacks
*/


//ROUTES

app.get('/', (req, res, next) =>{
  // let filepath = path.join(__dirname, './index.html')
  // res.sendFile(filepath);
  next();
}, (req, res, next) =>{
  console.log('req:', req.flavor)
  res.send(`Get /\n`);
});

app.get('/timestamp', (req,res) =>{
  res.send({ timestamp: Date.now() });
});

////////CRUD methods encapsulated in these 5 methods



app.route('/cats')
   .get((req, res) => {
     //GET /cats - get all cats
     Cat.getAll(function(err, cats){
       if (err){
         res.status(400).send(err);
       } else{
         res.send(cats);
       }
     });
   })
   .post((req, res) =>{
     // POST /cats - create a new cat
    Cat.create(req.body, function(err){
      if (err) return res.status(400).send(err);
      res.send();
    })
  });

app.route('/cats/:id')
   .get((req, res) =>{
     //GET /cats/5 - get one cat
     Cat.getOne(req.params.id, function(err, cat){
       if (err) return res.status(400).send(err);
       res.send(cat);
     })
     //res.send(`Here is cat #${req.params.id}!`)
   })
   .put((req, res) =>{
     //PUT /cats/5 - update one cat
     Cat.updateCat(req.params.id, req.body, function(err){
       res.send(err);
     })
   })
   .delete((req, res) =>{
     //DELETE /cats/5 - delete one cat
     Cat.deleteCat(req.params.id, function(err){
       res.send(err);
     })
   })

/*
//the colon is the url param! it's a dynamic value that is not optional
//the string does not matter
app.get('/cats/:id/:color', (req, res) =>{
  console.log('req.params', req.params)

  res.send('one cat!')
})
*/

/*
  //equivalent to the top function
  app.get((req, res) =>{
  res.send('all the cats')
})
  app.post((req, res) =>{
  res.send('post a new cat')
})

*/
app.listen(PORT, err => {
  console.log(err || `Server is listening on port ${PORT}`)
});
