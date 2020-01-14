'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.post('/admin/login', controller.admin.login)
  router.post('/admin/create', app.jwt, app.middleware.adminAuth(), controller.admin.create)
  router.get('/admin/list', app.jwt, app.middleware.adminAuth(), controller.admin.list)
  router.get('/admin/info', app.jwt, app.middleware.adminAuth(), controller.admin.admininfo)
  router.put('/admin/:id', app.jwt, app.middleware.adminAuth(), controller.admin.update)
  router.delete('/admin/:id', app.jwt, app.middleware.adminAuth(), controller.admin.delete)
  // list 增删改查
  router.post('/lists/create', app.jwt, controller.list.create)
  router.get('/lists/list', app.jwt, controller.list.list)
  router.delete('/lists/:id', app.jwt, controller.list.delete)
  router.put('/lists/:id', app.jwt, controller.list.update)
  // 文件上传
  router.post('/upload', controller.upload.create)
  router.post('/upload/url', controller.upload.url)
  router.post('/uploads', controller.upload.multiple)
  router.delete('/upload/:id', controller.upload.destroy)
  router.post('/upload/:id', controller.upload.update) // Ant Design Pro
  router.put('/upload/:id/extra', controller.upload.extra)
  router.get('/upload/:id', controller.upload.show)
  router.get('/upload', controller.upload.index)
  router.delete('/upload', controller.upload.removes)
};
