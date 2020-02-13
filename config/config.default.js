/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574905290286_4763';

  // add your middleware config here
  config.middleware = [ 'koaError' ];

  config.koaError = {
    postFormat: (e, { stack, ...rest }) => {
      if (process.env.NODE_ENV === 'production') {
        return rest
      } else {
        console.log(stack)
        return { stack, ...rest }
      }
    }
  };

  config.multipart = {
    whitelist: [ '.jpg', '.jpeg', '.png', '.gif', '.mov', '.mp4', '.avi', '.mp3', '.wma', '.wav', '.ogg', '.ape', '.acc',
      '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.csv', '.key', '.numbers', '.pages', '.pdf', '.txt', '.psd', '.zip', '.gz', '.tgz', '.gzip'
    ]
  }

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:8000' ],
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/node-elm',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
      useUnifiedTopology: true
    },
  };

  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  };

  return {
    ...config,
    ...userConfig,
  };
};
