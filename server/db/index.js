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

let AdminSchema = new Schema({
  admin_id: String, // 用户名 ,唯一标识
  admin_pwd: String,
  token: {
    type: String,
    default: ''
  }
})

exports.Admin = mongoose.model('AdminUser', AdminSchema)