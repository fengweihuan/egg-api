'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const AdminSchema = new mongoose.Schema({
    _id: { type: String, default: () => { return mongoose.Types.ObjectId().toString()} },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    status: { type: Number, required: true }, // 1:超级管理员、 2:普通管理、3:店长
    avatar: { type: String, default: 'public/images/awatar.png' },
    pid: { type: String, ref: 'Admin' }
  });
  return mongoose.model('Admin', AdminSchema);
};