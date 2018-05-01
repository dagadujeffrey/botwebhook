'use strict';
const http = require('http');
const host = 'stanghbot.herokuapp.com';
const listeningport = process.env.PORT || 6000;

const express = require('express');
const bodyparser = require('body-parser');

const app= express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.listen(listeningport, function () {
console.log('Get User Details BOT Running at ...' + listeningport);
});

app.post('/rateconvertor', (req,res) => {

let fxd = req.queryResult.parameters['fxd']; // city is a required param
let vxd = req.queryResult.parameters['vxd'];
let amount = req.queryResult.parameters['amount'];
console.log(fxd);



return res.json({
      
      fulfillmentText: "Your siaa ID Is someone@somewhere.com",
       source: "From our Webservice"
     });
});

/*
/////////////////////////////
exports.dialogflowWeatherWebhook = (req, res) => {
  // Get the fxd and vxd and amount from the request
  let fxd = req.body.queryResult.parameters['fxd']; // city is a required param
  let vxd = req.body.queryResult.parameters['vxd'];
  let amount = req.body.queryResult.parameters['amount'];
  res.json(
  { 
"fulfillmentText": "Test",
"fulfillmentMessages": [
  {
    "card": {
      "title": "card title",
      "subtitle": "card text",
      "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
      "buttons": [
        {
          "text": "button text",
          "postback": "https://assistant.google.com/"
        }
      ]
    }
  }
],
"source": "example.com",
"payload": {
  "google": {
    "expectUserResponse": true,
    "richResponse": {
      "items": [
        {
          "simpleResponse": {
            "textToSpeech": "this is a simple response"
          }
        }
      ]
    }
  },
  "facebook": {
    "text": "Hello, Facebook!"
  },
  "slack": {
    "text": "This is a text response for Slack."
  }
},
"outputContexts": [
  {
    "name": "projects/${PROJECT_ID}/agent/sessions/${SESSION_ID}/contexts/context name",
    "lifespanCount": 5,
    "parameters": {
      "param": "param value"
    }
  }
],
"followupEventInput": {
  "name": "event name",
  "languageCode": "en-US",
  "parameters": {
    "param": "param value"
  }
}}

  );
}
///////////////////////////////////////



   // Call the weather API
  /*callCurrencyApi(fxd, vxd, amount).then((output) => {

  res.json(
  { 
"fulfillmentText": output,
"fulfillmentMessages": [
  {
    "card": {
      "title": "card title",
      "subtitle": "card text",
      "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
      "buttons": [
        {
          "text": "button text",
          "postback": "https://assistant.google.com/"
        }
      ]
    }
  }
],
"source": "example.com",
"payload": {
  "google": {
    "expectUserResponse": true,
    "richResponse": {
      "items": [
        {
          "simpleResponse": {
            "textToSpeech": "this is a simple response"
          }
        }
      ]
    }
  },
  "facebook": {
    "text": "Hello, Facebook!"
  },
  "slack": {
    "text": "This is a text response for Slack."
  }
},
"outputContexts": [
  {
    "name": "projects/${PROJECT_ID}/agent/sessions/${SESSION_ID}/contexts/context name",
    "lifespanCount": 5,
    "parameters": {
      "param": "param value"
    }
  }
],
"followupEventInput": {
  "name": "event name",
  "languageCode": "en-US",
  "parameters": {
    "param": "param value"
  }
}}

  ); // Return the results of the weather API to Dialogflow
  }).catch(() => {
    res.json({ 'fulfillmentText': `I don't know how to convert this. Maybe I need to go back to Class 1.` });
  });
};

function callCurrencyApi (fxd, vxd, amount) {
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
    let path = '/api/convertor/' + fxd + '/' + vxd + '/' + amount;
    console.log('API Request: ' + host + path);

    // Make the HTTP request to get the weather
    http.get({host: host, path: path}, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        let response = JSON.parse(body);
        let output = '';
        if (!response)
        {
          output = `One or more unsupported currencies. Please try again with Euros, Dollars, Ghana Cedis, Pounds or Rands`;
        }
        else
        {
        let rate = response['rate'];
        console.log('Rate : ' + rate);
        let converted_amount = amount * rate;
        // Create response
        output = `${amount} ${fxd} to ${vxd} at today's rate is ${converted_amount}`;
      }
        // Resolve the promise with the output text
        console.log(output);
        resolve(output);
      });
      res.on('error', (error) => {
        console.log(`Error calling the currency convertor API: ${error}`)
        reject();
      });
    });
  });
}*/