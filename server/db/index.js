const mongoose = require('mongoose')
const db = mongoose.connect("mongodb://localhost:27017/blog",
{useNewUrlParser: true}, function (err) {
  if(err) {
    console.log(err)
  }else{
    console.log("mongoodb connection success")
  }
})

const Schema = mongoose.Schema

// 用户信息
let AdminSchema = new Schema({
  admin_id: String, // 用户名 ,唯一标识
  admin_pwd: String,
  token: {
    type: String,
    default: ''
  }
})

let ArticleSchema = new Schema({
  article_title: String,
  article_tags: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tag'
  },
  article_create_time: {
    type: String,
    default: Date.now
  },
  article_update_time: {
    type: String,
    default: Date.now
  },
  article_state: {
    type: Number,
    default: 1
  },
  article_cover: String,
  article_desc: String,
  article_content: String
})

exports.Admin = mongoose.model('AdminUser', AdminSchema)
exports.Article = mongoose.model('Article', ArticleSchema)