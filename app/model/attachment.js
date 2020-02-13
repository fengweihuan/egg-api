'use strict';
const dayjs = require('dayjs')
module.exports = app => {
  const mongoose = app.mongoose
  const AttachmentScheam = new mongoose.Schema({
    _id: { type: String, default: () => { return mongoose.Types.ObjectId().toString()} },
    extname: { type: String },
    filename: { type: String },
    url: { type: String, required: true },
    createdAt: { type: Number, default: dayjs().unix() }
  })
  return mongoose.model('Attachment', AttachmentScheam)
}
