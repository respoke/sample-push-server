#Respoke sample push server

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/chadxz/sample-push-server)

## Overview
Respoke push notifications are awesome, because you can get up and running easily without needing any backend components!
The static configuration available through the [Respoke Developer Console][] is usually enough to get you going with
standard push support for 1:1 message, group message, and call notifications.

However, some applications have push notification needs that are not a good fit for static configuration alone. For
example, if an application wants to conditionally send push notifications based on a checkbox in the application's ui,
then the application would need to control whether or not the push notification is dispatched.

It is for situations like these that Respoke provides the ability to enable "push events" via webhook and websocket.
"Push events" allow you to  "take over" the process of dispatching push notifications. Instead of Respoke automatically
dispatching the push notification to the registered mobile device, the application server can apply business logic to
the push event to decide whether the notification should be sent. If the application does decide to sent the
notification, it can customize many of the properties of the notification such as

 - the text of the message that is pushed
 - whether the 'badge' is enabled
 - the badge 'count'
 - the 'category' of the notification
 - the sound file to play when the notification is received

## This App
This application is an example of building a server that responds to push notification events broadcast via Respoke
webhook. This specific example demonstrates how you might dispatch push notifications to a push-enabled endpoint,
modifying the text of the push message prior to sending.

## Setup
 1. deploy this application somewhere, specifying the APP_SECRET environment variable using the value provided
 in the [Respoke Developer Console][]
 2. configure your application to post webhook events to the url where the application is deployed
 3. connect a mobile client to the application, have it register for push notifications, then disconnect it
 4. send the mobile client's endpointId a **direct** message

If all goes well, you should see a push notification with a '🎯' appended to it!

## License
[MIT](LICENSE)

[Respoke Developer Console]: https://portal.respoke.io

