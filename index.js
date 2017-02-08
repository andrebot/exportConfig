'use strict';

/**
 * This module helps exporting the right configuration to your APP.
 * It will try to see if there is any environment variable added
 * to the process (process.env.NODE_ENV) which will tell this module
 * which environment it is in. If none is found it will assume we are
 * in the 'development' environment.
 * 
 * @module ExportConfig
 */

/**
 * This module will pick one configObj's environment attributes accordingly to your environment
 * guided by process.env.NODE_ENV variable and will merge it with the configObj's default attribute
 * with Object.assign. You can define required variables which is ESSENTIAL to your app, if this variable
 * is missing, this module will throw an error.
 *
 * @param {Object} configObj Object which contains your environment configuration.
 * 
 * @example
 * const configObj = {
 *   default: {
 *     TIMEOUT: 720000,
 *     VIEW_ENGINE: 'handlebars'
 *   }
 *   development: {
 *     PORT: 9000
 *   },
 *   production: {
 *     PORT: 1337,
 *     TIMEOUT: 1000
 *   },
 *   required: ['VIEW_ENGINE']
 * }
 */
module.exports = function ExportConfig(configObj) {
  const env = process.env.NODE_ENV || 'development';
  const defaultObj = configObj.default || {};
  const envObj = configObj[env] || {};

  const newConfig = Object.assign({}, defaultObj, envObj);

  if (configObj.required && configObj.required.length > 0) {
    configObj.required.forEach(function (requiredConfig) {
      if (newConfig[requiredConfig] === undefined ||
          newConfig[requiredConfig] === null ||
          newConfig[requiredConfig] === '') {
        throw new Error('There is a configuration missing! Shutting down.');
      }
    });
  }

  return newConfig;
};
