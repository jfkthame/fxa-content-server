/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Middleware to log the requests

var logger = require('intel').getLogger('server.requests');
var expressLogger = require('express').logger;
var config = require('../configuration');

/**
 * Enhances connect logger middleware - custom formats.
 * See lib/configuration for usage.
 */
expressLogger.format('default_fxa',
              ':remote-addr - - ":method :url HTTP/:http-version" :status :response-time :res[content-length] ":referrer" ":user-agent"');

expressLogger.format('dev_fxa', ':method :url :status :response-time');

// Used when logging is disabled
var disabled = function (req, res, next) {
  next();
};

module.exports = function () {
  'use strict';

  return config.get('disable_route_logging')
          ? disabled
          : expressLogger({
              format: config.get('route_log_format'),
              stream: {
                write: function (x) {
                  logger.info(typeof x === 'string' ? x.trim() : x);
                }
              }
            });
};
