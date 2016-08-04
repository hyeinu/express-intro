
//getAll is a function that is being returned when called in the app.js
//cb is callback
//we need the callback because within the function getAll there is asynchronous things happen

const fs = require('fs');
const path = require('path'); //create file path
const uuid = require('uuid')
const dataFilePath = path.join(__dirname, '../data/cats.json') //give us an absolute path



exports.getAll = function(cb){
  fs.readFile(dataFilePath, (err, buffer) =>{
    if (err) return cb(err)
    /*same thing as above
    if (err) {
      cb(err);
      return; //stops function so it doesnt do anything outside
    } */

    let cats;

    try{
      cats = JSON.parse(buffer);
    } catch(err){
      return cb(err);
    }

    //call back with the error and cats!
    cb(null, cats)

  });
  //1. read the json file, to get the data
  //2. parse the data, to get the array
  //3. call back with the array
  //    (if there's an error, callback with error)
}

exports.create = function(catObj, cb){
    //same thing as exports.getAll(function())
    this.getAll(function(err, cats){ //reading and parsing
      if (err) return cb(err);
      catObj.id = uuid.v4();
      cats.push(catObj);

      fs.writeFile(dataFilePath, JSON.stringify(cats), function(err){
        cb(err);
      })
    });
}

exports.getOne = function(catid, cb){
  // if (err) return cb(err)
  this.getAll(function(err, cats){ //reading and parsing
    if (err) return cb(err);
    cats.map(cat => { //ask the TA's how .find works
      if (cat.id === catid){
        cb(null, cat)
      }
    });
  });
}

exports.updateCat = function(catid, catbody, cb){
  this.getAll(function(err, cats){ //reading and parsing
    if (err) return cb(err);
    catbody.id = catid;
    cats.map((cat, index) => { //ask the TA's how .find works
      if (cat.id === catid){
        cats.splice(index, 1, catbody)
        fs.writeFile(dataFilePath, JSON.stringify(cats), function(err){
          cb(err);
        })
      }
    });
  });
}

exports.deleteCat = function(catid, cb){
  this.getAll(function(err, cats){ //reading and parsing
    if (err) return cb(err);
    cats.map((cat, index) => { //ask the TA's how .find works
      if (cat.id === catid){
        cats.splice(index, 1)
        fs.writeFile(dataFilePath, JSON.stringify(cats), function(err){
          cb(err);
        })
      }
    });
  });
}
