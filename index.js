'use strict';
const http = require('http');
const soap = require('soap');
const host = 'stanghbot.herokuapp.com';
const fx_api_url = 'https://196.8.204.73/citwebservice/GetFXRate?WSDL';
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



function callCurrencyAPI (fxd, vxd,amount) {
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to body of the request to get the currency
    var args = {fixedCurrency: fxd, varCurrency : vxd};
    // Make the HTTP request to get the weather
    soap.createClient(url, function(err, client) 
    {

    client.GetFXRate(args, function(err, result) 
    {

        console.log(result.GetFXRateResult);
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
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var today = dd+'-'+monthNames[mm-1]+'-'+yyyy;
        let output = '';

        //Logic to get the rate of the inverse
        if (!result)
        {
          //retry with reverse

          output = `Oops. Now here is a currency I do not support. Please try again with Euros, Dollars, Ghana Cedis, Pounds or Rands`;

        }
        else
        {
            //let rate = response['rate'];
            //Get rate from JSON
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



    }).then(function(){
      console.log('No. Now what next');
    });

    });
        // Resolve the promise with the output text
        console.log(output);
        resolve(output);
      });

}
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
