const router = require('koa-router')()
const Article = require('../db').Article
const articlemodel = require('../models/article')
router.prefix('/api/article')

// new articlemodel({
//   article_title = '哈哈哈',
//     article_state = 1, 
//     article_desc = '放松放松和',
//     article_content = '大上海市单位换算'
// }).save()

// 添加文章
router.post('/', async ctx => {
  let {
    article_title = '',
    article_tags = '',
    article_state = 1,
    article_cover = '',
    article_desc = '',
    article_content = ''
  } = ctx.request.body

  if (article_title === '' || article_content === '') {
    ctx.body = {
      code: 401,
      msg: '请输入标题,或内容'
    }
    return
  }

  let article = new Article({
    article_title,
    article_tags,
    article_state,
    article_cover,
    article_cover,
    article_desc,
    article_content
  })
  let res = await article.save()
  if (res) {
    ctx.body = {
      code: 200,
      msg: '添加文章成功'
    }
  }else {
    ctx.body = {
      code: 500,
      msg: '添加文章失败'
    }
  }
})

// 获取文章列表,包括翻页要页码,查询要查询参数,查询 tag,查询 state
router.get('/',  async ctx => {
  let {current_page = 1,page_size=10,keyword='',tag='',state=''} = ctx.query
  try {

    // 下面这大段代码都是 设置查询条件的,需要了解 mongoose 的语法
    let querys = {}
    let fields = {
      article_content: false
    }
    querys.article_state = 1
    if (keyword != '') {
      let keywordReg = new RegExp(keyword)
      querys.$or = [
        {'article_title': keywordReg},
        {'article_content': keywordReg},
        {'article_desc': keywordReg}
      ]
    }

    if (tag != '') {
      querys.article_tags = {$in:[tag]}
    }

    if (state !=  '') {
      querys.article_state = state
    }

    let options  = {
      sort: {'article_update_time': '-1'},
      skip: Number((current_page -1) * page_size),
      limit: Number(page_size)
    }

    let res = await articlemodel.find_all({querys, fields, options})
    let total = await Article.countDocuments(querys)
    ctx.body = {
      code: 200,
      data: {
        list: res || []
      }
    }
  } catch (error) {
    
  }
})

// 查找文章


module.exports = router