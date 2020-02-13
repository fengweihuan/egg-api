'use strict';
module.exports = app => {
  const mongoose = app.mongoose
  const ListScheam = new mongoose.Schema({
    _id: { type: String, default: () => { return mongoose.Types.ObjectId().toString() } },
    name: { type: String, required: true }, // 名称
    type: { type: String, required: true }, // 类型
    number: { type: Number, required: true }, // 数量
    unit: { type: String, required: true }, // 单位
    desc: { type: String } // 描述
  })
  return mongoose.model('List', ListScheam)
}