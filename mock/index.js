const Mock = require('mockjs')

/* 
  模拟了这样一个业务场景：
  一个网格布局的页面，每个网格是不同类型的图表、列表、最新的新闻动态，
  并且网格的顺序不是固定的，只有用户购买了的才会显式。
  /api/getProductIds 模拟的是获取用户的权限
  /api/getDataById 模拟的是请求对应网格的数据
*/

module.exports = function(middlewares) {
  middlewares.unshift({
    path: '/api/getProductIds',
    middleware(_, res) {
      const { data } = Mock.mock({
        "data|24": [{
          "id|+1": 1011,
        }],
      })
      res.send({
        code: 200,
        data,
        msg: 'ok',
      })
    }
  })
  middlewares.unshift({
    path: '/api/getDataById',
    middleware(_, res) {
      const _getRandom = () => Math.floor(Math.random() * 60)

      const { data } = Mock.mock({
        "data": {
          "xAxis|5": ['@date("yyyy-MM-dd")'],
          "yAxis|5": () => Array(5).fill(0).map(() => _getRandom()),
        },
      })
      setTimeout(() => {
        res.send({
          code: 200,
          data,
          msg: 'ok',
        })
      }, 2000)
    }
  })
  return middlewares
}