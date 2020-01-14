'use strict';

module.exports = {
  // 返回数据
  success(res = 'ok', msg = '请求成功') {
    this.ctx.body = {
      code: 0,
      result: res,
      msg
    }
    this.ctx.status = 200
  },
  // body参数清除code
  removeCode (body, str) {
    if (str.length > 0) {
      const arr = str.split(',')
      arr.map(list => {
        if (body[list]) {
          delete body[list]
        }
      })
      return body
    } else {
      return body
    }
  },
  /**
 * 重组tree 数据结构
 * @param {Array} arr 需要重组的一维数组
 * @param {String} parentid 树结构父级标识
 * @param {String} id 树结构子级标识
 */
  regroupTree(arr, parentid = 'pid', id = '_id') {
    const rootArr = []
    const contentArr = []
    arr.map(item => {
      if (!item[parentid]) {
        rootArr.push(item)
      } else {
        contentArr.push(item)
      }
    })
    rootArr.map(item => {
      item.children = addChildren(item, item[id], contentArr, parentid, id)
    })
    return rootArr
    // 递归获取子数据
    function addChildren(traget, currentID, contentArr, parentid, id) {
      const surplusArr = []
      traget.children = []
      contentArr.map(item => {
        if (item[parentid].toString() === currentID.toString()) {
          traget.children.push(item)
        } else {
          surplusArr.push(item)
        }
      })
      if (surplusArr.length > 0) {
        traget.children.map(item => {
          item.children = addChildren(item, item[id], surplusArr, parentid, id)
        })
      }
      return traget.children
    }
  }
}
