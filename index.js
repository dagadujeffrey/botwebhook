'use strict';
const http = require('https');
const request = require('request');
const happy= '😃'
const host = 'stanghbot.herokuapp.com';
var username = '';
var firstname = '';
var lastname = '';
const listeningport = process.env.PORT || 6000;
const webhookresponse = '';
const express = require('express');
const bodyparser = require('body-parser');
let psid_fname = "";
let PAGE_ACCESS_TOKEN= 'EAAXX1ZAUONq4BAKoDa7cvCAtkN1Ld4oJoZAXenxzuzFPqPZCHnQaMETPSvL2dEwXPHRXAiXoJxpxGf9OAnHz4GZCZBZBUZBHKRb3gAL2xIl4lZCuVpoXt6ZCZAPBr54yG9ZAGgoQnMTdepjP7THHrmNmkbHVnjTv9UoGWOVUJltMGkHdvAW7hYUFdVV';

const app= express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.listen(listeningport, function () {
console.log('Get User Details BOT Running at ...' + listeningport);
});

app.post('/rateconvertor', (req,res) => 
{
    
    
//case convertor
switch(req.body.queryResult.intent.displayName)
{
    case 'currency.convert':
       console.log(req.body.originalDetectIntentRequest.source);
       if(req.body.originalDetectIntentRequest.payload.data.source == 'skype' )
       {
         username = req.body.originalDetectIntentRequest.payload.data.user.name;
         firstname = username.split(' ').slice(0, -1).join(' ');
         lastname = username.split(' ').slice(-1).join(' ');    
       }
       else if(req.body.originalDetectIntentRequest.source == 'google')
       {
         username = 'Googler Man';
         firstname = 'Googler';
         lastname = username.split(' ').slice(-1).join(' ');    
       }
       let fxd = req.body.queryResult.parameters['fxd']; // city is a required param
       let vxd = req.body.queryResult.parameters['vxd'];
       let amount = req.body.queryResult.parameters['amount'];

        callCurrencyAPI(fxd, vxd, amount).then((output) => {
        return res.json({'fulfillmentText': `Sure ${firstname}! ${output}` }); // Return the results of the weather API to Dialogflow
      }).catch(() => {
        return res.json({ 'fulfillmentText': `I don't know the weather but I hope it's good!` });
      });
      break;

    case 'test':
       console.log(req.body.originalDetectIntentRequest.source);
       console.log(JSON.stringify(req.body.originalDetectIntentRequest.payload));
        return res.json({ 'fulfillmentText': `Hi. Test Guy` });

        
      break;

    case 'get_started':

        console.log('psid :: ' + req.body.originalDetectIntentRequest.payload.data.sender.id);
        // getUserInfo('1994382743908199').then(function(profile_data){
        //     return res.json({ 'fulfillmentText': `Hello ${profile_data.first_name} I am Siva, and I can help you pay bills, buy airtime, check FX rates, check your balance and more. ${happy}`});
        // });
              
        getUserInfo("1994382743908199").then(function(results){
    // access results here by chaining to the returned promise
    return res.json({ 'fulfillmentText': `Hello ${results.first_name} I am Siva, and I can help you pay bills, buy airtime, check FX rates, check your balance and more. ${happy}`});
});


        
      break;
        
   case 'welcomebot':
        //handle different bot scenarios here. Skype Facebook etc.
        if(req.body.originalDetectIntentRequest.payload.data.source == 'skype' )
       {
         username = req.body.originalDetectIntentRequest.payload.data.user.name;
         firstname = username.split(' ').slice(0, -1).join(' ');
         lastname = username.split(' ').slice(-1).join(' ');    
       }
       else if(req.body.originalDetectIntentRequest.source == 'google')
       {
         username = 'Googler Man';
         firstname = 'Googler';
         lastname = username.split(' ').slice(-1).join(' ');    
       }
        var output_welcome = `Welcome ${firstname}`
        return res.json({'fulfillmentText': output_welcome ,
        "fulfillmentMessages": [
  {
    "card": {
      "title": output_welcome,
      "subtitle": "Quick Guide",
      "imageUri": "",
      "buttons": [
        {
          "text": "Convert 1$ to GHS",
          "postback": ""
        },
        {
          "text": "Branch Info",
          "postback": ""
        },
         {
          "text": "About Current Account",
          "postback": ""
        }
      ]
    }
  }
]
      });

   break;

    
 }
});

//case check balance




function getUserInfo(sender_psid){

  // Setting URL and headers for request
    var options = {
        url: 'https://graph.facebook.com/v2.6/'+sender_psid+'?fields=first_name,last_name,profile_pic&access_token='+PAGE_ACCESS_TOKEN
        
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
     // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })


  // var options = {
  //   ur
  // }
  // request('https://graph.facebook.com/v2.6/'+sender_psid+'?fields=first_name,last_name,profile_pic&access_token='+PAGE_ACCESS_TOKEN,
  // { json: true }, (err,res, body)=> {

  // if (err) {
  // return console.log(err); 
  // }
  // console.log(JSON.stringify(body));
  // return body;

  // });

  // }




}


function callCurrencyAPI (fxd, vxd,amount) {
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
   let path = '/api/convertor/' + fxd + '/' + vxd + '/' + amount;

    // Make the HTTP request to get the weather
    http.get({host: host, path: path}, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        let response = JSON.parse(body);
        
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
        var today = dd+'-'+monthNames[mm-1]+'-'+yyyy;

        // Create response
        let output = '';
        if (!response)
        {
          output = `Oops. Now here is a currency I do not support. Please try again with Euros, Dollars, Ghana Cedis, Pounds or Rands`;
        }
        else
        {
            let rate = response['rate'];
        
            let converted_amount = amount * rate;
            converted_amount = converted_amount.toFixed(2);
            amount = amount.toFixed(2);
            var converted_amount1 = numberWithCommas(converted_amount);
            var amount1 = numberWithCommas(amount);
        // Create response
            if (amount === '1')
            {
                output = `The rate from ${fxd} to ${vxd} as at ${today} is ${rate}`;
            }
        else output = `${amount1} ${fxd} to ${vxd} on ${today} is ${vxd} ${converted_amount1}`;
       
      }
        // Resolve the promise with the output text
        console.log(output);
        resolve(output);
      });
      res.on('error', (error) => {
        console.log(`Error calling the currency API: ${error}`)
        reject();
      });
    });
  });
}
    

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
