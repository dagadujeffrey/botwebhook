'use strict';

var listeningport = process.env.PORT || 6000;

const express = require('express');
const bodyparser = require('body-parser');
const app= express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.listen(listeningport, function () {
console.log('Get User Details BOT Running at ...' + listeningport);
});
app.post('/rateconvertor', (req,res) => {

console.log(' GetUserdetails being called by dialogflow...');

console.log('GetEMAILID ACtion fired...');
return res.json({
      
      fulfillmentText: "Your siaa ID Is someone@somewhere.com",
       source: "From our Webservice"
     });
});

// switch(req.body.result.action) {
//   case 'GETEMAILID':
//     console.log('GetEMAILID ACtion fired...');
//     return res.json({
//       speech:"Your EMAIL ID Is someone@somewhere.com",
//       displayText: "Your EMAIL ID Is someone@somewhere.com",
//       source: "From our Webservice"
//     });
//     break;

//  case 'GETPWD':
//    console.log('GETPWD ACtion fired...');
//    return res.json({
//      speech:"Your password is been EMAILed to someone@somewhere.com",
//      displayText: "Your password is been EMAILed to someone@somewhere.com",
//      source: "From our Webservice"
//    });
//    break;

// }

