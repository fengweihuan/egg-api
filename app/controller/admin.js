'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  constructor(ctx) {
    super(ctx)
    // 登录验证
    this.loginRule = {
      username: { type: 'string', },
      password: { type: 'string', min: 6, }
    }
    // 创建验证
    this.createRule = {
      username: { type: 'string', },
      password: { type: 'string', min: 6 },
      status: { type: 'enum', values: [ 2, 3 ] } // 1:超级管理员、 2:普通管理、 3:店长
    }
    // 更新验证
    this.updateRule = {
      username: { type: 'string', required: false },
      password: { type: 'string', min: 6, required: false }
    }
  }
  // 管理员账号校验
  async adminAuth(opitions, next) {
    const { ctx } = this
    const data = ctx.state.user.data
    const statusArr = [ 1, 2, 3 ]
    if (data.status && statusArr.includes(data.status)) {
      await next()
    } else {
      ctx.throw(401, '非管理员角色无权限操作!')
      await next()
    }
  }
  // 管理员登录
  async login() {
    const { ctx } = this
    ctx.validate(this.loginRule)
    const admin = await ctx.model.Admin.findOne(ctx.request.body)
    if (!admin) {
      ctx.throw(404, '用户名或密码不正确!')
    }
    ctx.helper.success({
      token: await ctx.service.token.apply({
        _id: admin._id,
        status: admin.status
      })
    })
  }
  // 创建管理员
  async create() {
    const { ctx } = this
    ctx.validate(this.createRule)
    const status = ctx.state.user.data.status
    if (status !== 1 && ctx.request.body.status === 2 || status === 3) {
      ctx.throw(401, '无操作权限!')
    }
    try {
      await ctx.model.Admin.create(ctx.request.body)
    } catch (err) {
      if (err.code === 11000) {
        ctx.throw(403, '管理员已存在!')
      }
    }
    ctx.helper.success()
  }
  // 获取管理员列表
  async list() {
    const { ctx } = this
    const { page = 1, pageSize = 10 } = ctx.query
    const skip = ((Number(page)) - 1) * Number(pageSize)
    const status = ctx.state.user.data.status
    const query = status === 1 ?
      ctx.model.Admin.find() :
      ctx.model.Admin.find({ pid: ctx.state.user.data._id }).populate('pid')
    const total = await query.countDocuments()
    const data = await query.find().skip(skip).limit(Number(pageSize)).exec()
    ctx.helper.success({
      data, total
    })
  }
  // 修改管理员
  async update() {
    const { ctx } = this
    const requestBody = ctx.request.body
    ctx.validate(this.updateRule)
    const admin = await ctx.model.Admin.findById(ctx.params.id)
    if (!admin) {
      ctx.throw(404, '管理员不存在!')
    }
    const body = ctx.helper.removeCode(requestBody, 'status,password')
    await admin.update(body).exec()
    ctx.helper.success()
  }
  // 删除管理员
  async delete() {
    const { ctx } = this
    const status = ctx.state.user.data.status
    let admin = await ctx.model.Admin.findById(ctx.params.id)
    if (!admin) {
      ctx.throw(404, '管理员不存在!')
    }
    if (status === 3 || (status === 2 && ctx.state.user.data._id !== admin.pid)) {
      ctx.throw(401, '无操作权限!')
    }
    await ctx.model.Admin.findByIdAndRemove(ctx.params.id).exec()
    ctx.helper.success()
  }
  // 获取登录用户信息
  async admininfo() {
    const { ctx } = this
    const res = await ctx.model.Admin.findById(ctx.state.user.data._id).populate('pid').exec()
    if (res) {
      ctx.helper.success(res)
    } else {
      ctx.throw(404, '管理员不存在!')
    }
  }
}

module.exports = AdminController;
