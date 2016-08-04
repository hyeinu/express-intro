const request = require('request');

function getPerson(id, callback){
  request.get(`http://swapi.co/api/people/${id}/`, function(error, response, body){ //callback
    console.log('error:', error);
    console.log('body:', body);

    callback(error || body); //invoke the callback here
    /* if(err){
        callback(err);
        } else{
        callback(null, body);
      }*/
  })
}

//defined a custom call back to treat an asynchronous function

getPerson(5, function(err, body){ //callback being invoked
  //handle the err if(err) 
  console.log('callback:', body)
});






/////


/*


const request = require('request');
function getPerson(id){
  //getPerson is not returning anything
  request.get(`http://swapi.co/api/people/${id}/`, function(error, response, body){ //callback
    console.log('error:', error);
    console.log('body:', body);
  // return body; //will be undefined
  because it returns to the most IMMEDIATE FUNCTION (which is the callback)
  })
  // return body; will not be returned because it works in sync with the commands above
  it does not WAIT for the request.get (async function) to come back so there is no value for body
}

let result = getPerson(5);

console.log('result:', result)





/////

request.get(`http://swapi.com/api/people/${id}/`, function(err, response, data){
  //callback is a function that calling some other ***function** and PASSING in the err, response, and data

});

*/
