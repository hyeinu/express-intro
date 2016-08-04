const PORT = 8000;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
//makes it possible to have other objects when extended is false
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//ROUTES

app.get('/', (req, res, next) =>{
  req.flavor = 'Blueberry';
  next();
}, (req, res, next) =>{
  console.log('req:', req.flavor)
  res.send(`Get /\n`);
});

app.get('/timestamp', (req,res) =>{
  res.send({ timestamp: Date.now() });
});

app.post('/cats', (req, res) => {
  console.log("req.body:", req.body)
  res.send(req.body);
})

app.listen(PORT, err => {
  console.log(err || `Server is listening on port ${PORT}`)
});
