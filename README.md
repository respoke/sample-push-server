#Respoke sample push server

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/chadxz/sample-push-server)

This application is an example of building a server that responds to push notification events broadcast via Respoke
webhook. Respoke push notification events are designed to give the developer complete control over:

 - the circumstances that determine when a push notification is dispatched
 - the message pushed
 - whether the 'badge' is enabled
 - the badge 'count'
 - the 'category' of the push notification
 - the sound file to play when the notification is received

This specific example server demonstrates how you might dispatch push notifications to a push-enabled endpoint, modifying
the text of the push message prior to sending.

##Setup
 1. deploy this application somewhere, specifying the APP_SECRET environment variables using the secrets provided
 in the [Respoke Developer Console](https://portal.respoke.io)
 2. configure your application to post webhook events to the url where the application is deployed
 3. connect a mobile client to the application, have it register for push notifications, then disconnect it
 4. send the mobile client's endpointId a message

If all goes well, you should see a push notification with a '🎯' appended to it!
