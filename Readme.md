# Export Config
This is a small module to help developers to manage their App's configuration. The idea is to be able to have one config file for each concern/subject in your system.

Organizing your configuration this way you can easily find what you are looking for without searching through different files for each environment. But we should also be able to import seemlessly this configurations in the App, to avoid poluting the code and to not confuse the dev team. It should be easy as `require('./config/database');`.

## Example
```js
// config/database
'use strict';

const exportConfig = require('export-config');

const DatabaseConfig = {
  default: {
    RECONNECT_TRIES: 3,
    RECONNECT_INTERVAL: 1000,
    AUTO_RECONNECT: true,
    BUFFER_MAX_ENTRIES: 0,
    SCHEDULE_TIMEOUT: 7200000
  },
  development: {
    URI: 'mongodb://localhost/dev_db'
  },
  staging: {
    URI: 'mongodb://localhost/test'
  },
  production: {
    URI: 'mongodb://243.123.63.10/prod_db_01',
    RECONNECT_TRIES: 4,
    RECONNECT_INTERVAL: 1500
  }
}

module.exports = exportConfig(DatabaseConfig);
```

```js
// index.js

const DatabaseConfig = require('./config/database');

console.log(DatabaseConfig);
/**
 * If we have not set the process.env.NODE_ENV variable, it will print:
 * {
 *   RECONNECT_TRIES: 3,
 *   RECONNECT_INTERVAL: 1000,
 *   AUTO_RECONNECT: true,
 *   BUFFER_MAX_ENTRIES: 0,
 *   SCHEDULE_TIMEOUT: 7200000,
 *   URI: 'mongodb://localhost/dev_db'
 * }
 *
 * But if we have set the process.env.NODE_ENV to 'production'
 * {
 *   RECONNECT_TRIES: 4,
 *   RECONNECT_INTERVAL: 1500,
 *   AUTO_RECONNECT: true,
 *   BUFFER_MAX_ENTRIES: 0,
 *   SCHEDULE_TIMEOUT: 7200000,
 *   URI: 'mongodb://243.123.63.10/prod_db_01'
 * }
 */
```
This way we can arrange our configuration files as:

```
+-- config
|   +-- mongo.js
|   +-- redis.js
|   +-- ghost.js
|   +-- googleCalendar.js
|   ...
+-- index.js
```
And import each configuration file separetly nicely and seemlessly as `require('./config/mongo.js')`.