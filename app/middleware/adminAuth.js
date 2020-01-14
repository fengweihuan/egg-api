'use strict';
// 管理员账号校验
module.exports = opitions => {
  return async function adminAuth(ctx, next) {
    const data = ctx.state.user.data
    const statusArr = [ 1, 2, 3 ]
    if (data.status && statusArr.includes(data.status)) {
      await next()
    } else {
      ctx.throw(401, '非管理员角色无权限操作!')
    }
  }
}
