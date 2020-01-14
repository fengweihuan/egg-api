'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  static: {
    enable: true,
    package: 'egg-static',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
