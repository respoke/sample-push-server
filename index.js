'use strict';
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var validations = require('./validations');
var _ = require('lodash');

function parseMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {
    return null;
  }
}

var config = {
  appSecret: process.env.APP_SECRET,
  port: process.env.PORT || 8080
};

if (!config.appSecret) {
  throw new Error('APP_SECRET environment variable is required. See project README for details.');
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

  // only process direct messages
  if (event.originalMsg.header.type !== 'message') {
    return;
  }

  // retrieve the original message
  var message = event.originalMsg.body;

  if (event.config.msgProperty) {
    message = parseMessage(message);
    message = _.get(message, event.config.msgProperty) || '';
  }

  // customize the original message
  var bullsEyeEmoji = '🎯';
  message =  bullsEyeEmoji + ' ' + message;

  // dispatch the push notification
  var requestOptions = {
    method: 'POST',
    url: 'https://api-int.respoke.io/v1/push-notification/' + encodeURIComponent(event.pushNotificationId),
    headers: {
      'App-Secret': config.appSecret
    },
    json: {
      originalMsg: event.originalMsg,
      pushText: message
    }
  };

  if (event.cacheId) {
    requestOptions.json.cacheId = event.cacheId;
  }

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
