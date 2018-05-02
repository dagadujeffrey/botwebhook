'use strict';
const http = require('http');
const host = 'stanghbot.herokuapp.com';
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

let fxd = req.body.queryResult.parameters['fxd']; // city is a required param
let vxd = req.body.queryResult.parameters['vxd'];
let amount = req.body.queryResult.parameters['amount'];

callCurrencyAPI(fxd, vxd, amount).then((output) => {
    res.json({ 'fulfillmentText': output }); // Return the results of the weather API to Dialogflow
  }).catch(() => {
    res.json({ 'fulfillmentText': `I don't know the weather but I hope it's good!` });
  });
};


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
        

        // Create response
        let output = '';
        if (!response)
        {
          output = `One or more unsupported currencies. Please try again with Euros, Dollars, Ghana Cedis, Pounds or Rands`;
        }
        else
        {
        let rate = response['rate'];
        
        let converted_amount = amount * rate;
        // Create response
        output = `${amount} ${fxd} to ${vxd} at today's rate is ${converted_amount}`;
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
    
