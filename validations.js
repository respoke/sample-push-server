'use strict';
var Joi = require('joi');

var pushEventSchema = Joi.object().keys({
  header: Joi.object().keys({
    type: Joi.string().valid('pushEvent')
  }),
  originalMsg: Joi.object().keys({
    header: Joi.object().keys({
      type: Joi.string(),
      channel: Joi.string().optional()
        .when('type', { is: 'pubsub', then: Joi.required() })
    }),
    message: Joi.string().optional()
      .when('header.type', { is: 'pubsub', then: Joi.required() }),
    body: Joi.string().optional()
      .when('header.type', { is: ['message', 'signal'], then: Joi.required() })
  }),
  pushNotificationId: Joi.string(),
  cacheId: Joi.string().optional(),
  config: Joi.object()
});

/**
 * Determine if the provided webhook `event` is a well-formed push notification event.
 *
 * @param {object} event The event to inspect.
 * @returns {boolean} Whether or not the event is a valid push event.
 */
exports.isValidPushEvent = function (event) {
  var result = Joi.validate(event, pushEventSchema, { allowUnknown: true, presence: 'required' });
  return !result.error;
};
