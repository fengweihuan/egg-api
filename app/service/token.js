'use strict';

const Service = require('egg').Service;

class TokenService extends Service {
  async apply(data) {
    const { ctx } = this
    return ctx.app.jwt.sign({
      data,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, ctx.app.config.jwt.secret)
  }
}

module.exports = TokenService;
