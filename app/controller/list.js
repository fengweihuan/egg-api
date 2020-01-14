'use strict';

const Controller = require('egg').Controller;

class ListController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createRule = {
      name: { type: 'string' },
      description: { type: 'string', required: false }  //描述
    }
    this.updateRule = {
      name: { type: 'string', required: false },
      description: { type: 'string', required: false }  //描述
    }
  }
  // 列表(带分页)
  async list() {
    const { ctx } = this
    const { page = 1, pageSize = 10, q = '' } = ctx.query
    const reg = new RegExp(q, 'i')
    const skip = ((Number(page)) - 1) * Number(pageSize)
    const query = ctx.model.List.find({
      $or: [
        { name: {$regex: reg} },
        { description: {$regex: reg} }
      ]
    })
    const total = await query.countDocuments()
    const data = await query.find().skip(skip).limit(Number(pageSize)).exec()
    ctx.helper.success({ data, total })
  }
  // 增
  async create() {
    const { ctx } = this
    ctx.validate(this.createRule)
    const res = await ctx.model.List.create(ctx.request.body)
    ctx.helper.success(res)
  }
  // 更新
  async update() {
    const { ctx } = this
    const requestBody = ctx.request.body
    ctx.validate(this.updateRule)
    let res = await ctx.model.List.findById( ctx.params.id )
    if (!res) {
      ctx.throw(404, '找不到数据!')
    }
    const body = ctx.helper.removeCode(requestBody, 'deleteCode')    //移除禁止更新的字段
    await res.update(body).exec()
    ctx.helper.success()
  }
  // 删除(批量)
  async delete() {
    const { ctx } = this
    const arr = ctx.params.id.split(',')
    arr.map(async id => {
      await ctx.model.List.findOneAndDelete(id)
    })
    ctx.helper.success()
  }
}

module.exports = ListController;
