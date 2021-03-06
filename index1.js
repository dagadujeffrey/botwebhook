'use strict';
const http = require('https');
const host = 'stanghbot.herokuapp.com';
var username = '';
var firstname = '';
var lastname = '';
const listeningport = process.env.PORT || 6000;
const webhookresponse = '';
const express = require('express');
const bodyparser = require('body-parser');

const app= express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.listen(listeningport, function () {
console.log('Get User Details BOT Running at ...' + listeningport);
});

app.post('/rateconvertor', (req,res) => 
{

      console.log(req.body.originalDetectIntentRequest.source);
      console.log(JSON.stringify(req.body.originalDetectIntentRequest.payload.data));
  
     



});
//case check balance



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
