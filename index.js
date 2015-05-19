'use strict';
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var validations = require('./validations');

var config = {
  appId: process.env.APP_ID,
  appSecret: process.env.APP_SECRET,
  port: process.env.PORT || 8080
};

if (!config.appId || !config.appSecret) {
  throw new Error('APP_ID and APP_SECRET environment variables are required. See project README for details.');
}

var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Respoke sample push server is active!');
});

app.post('/', function (req, res) {
  // immediately acknowledge the request
  res.status(200).end();

  var event = req.body;

  // only process valid push notification events
  if (!validations.isValidPushEvent(event)) {
    return;
  }

  // customize the original message
  var message = event.originalMsg.message;
  message = '🎯 ' + message;

  // dispatch the push notification
  var requestOptions = {
    method: 'POST',
    url: 'https://api-int.respoke.io/v1/push-notification/' + encodeURIComponent(event.pushTokenId),
    headers: {
      'App-Secret': config.appSecret
    },
    json: {
      originalMsg: event.originalMsg,
      pushText: message
    }
  };

  request(requestOptions, function (err, response) {
    if (err) {
      console.error('error sending push notification:', err);
      return;
    }

    console.log('push notification dispatch response', {
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.body
    });
  });
});

app.listen(config.port, function () {
  console.log('sample push server listening on port ' + config.port);
});
