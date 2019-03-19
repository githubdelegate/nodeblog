const router = require('koa-router')()
const BMP24 = require('gd-bmp').BMP24
const Admin = require('../db').Admin
const AdminModel = require('../models/admin')
const sha1 = require('sha1')
const SHA1_ADD_STR = "zyblog_encrypted_string"
router.prefix('/api/admin')

//  实现注册的原理: 先实现 mongoose 数据库定义, 然后实现注册方法, 根据 id
//  ,pwd 判断数据库中是否已经有了,没有就存储, 有了就提示已有了
// 注册  根据 admin_id , admin_pwd ,checkcode 注册
router.post('/signup', async (ctx) => {
  let {
    admin_id,
    admin_pwd
  } = ctx.request.body
  if (admin_id === '' || admin_pwd === '') {
    ctx.body = {
      code: 401,
      msg: '请填写完整信息'
    }
    return
  }
  let res = await AdminModel.find_by_admin_id(admin_id)
  if (res.length != 0) {
    ctx.body = {
      code: 409,
      msg: '用户名不可用, 重新填写'
    }
    return
  }

  let admin = new Admin({
    admin_id,
    admin_pwd: sha1(sha1(admin_pwd + SHA1_ADD_STR))
  })

  res = await admin.save()
  if (res) {
    ctx.body = {
      code: 200,
      msg: '注册成功'
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '注册失败'
    }
  }

})

// 登录,检查传递进来的 admin_id, admin_pwd ,直接数据库查找对应数据,有就成功
router.post('/login', async (ctx) => {
  let {
    admin_id,
    admin_pwd
  } = ctx.request.body
  if (admin_id === '' || admin_pwd === '') {
    ctx.body = {
      code: 401,
      msg: '账号密码错误'
    }
    return
  }

  let res = await Admin.find({
    admin_id,
    admin_pwd: sha1(sha1(admin_pwd + SHA1_ADD_STR))
  })
  if (res.length == 0) {
    ctx.body = {
      code: 401,
      msg: '账号密码错误'
    }
    return
  }
  ctx.body = {
    code: 200,
    msg: '登录成功',
    data: {
      admin_id: res[0].admin_id
    }
  }
})

router.get('/checkcode', async (ctx) => {
  try {
    let {
      img
    } = makeCapcha()
    ctx.body = {
      code: 200,
      msg: '获取验证码成功',
      data: {
        img: "data:image/bmp;base64," + img.getFileData().toString('base64')
      }
    }
  } catch (error) {
    console.log(error)
  }

})

function rand(min, max) {
  return Math.random() * (max - min + 1) + min | 0; //特殊的技巧，|0可以强制转换为整数
}

function makeCapcha() {
  var img = new BMP24(100, 40);
  img.drawCircle(rand(0, 100), rand(0, 40), rand(10, 40), rand(0, 0xffffff));
  //边框
  img.drawRect(0, 0, img.w - 1, img.h - 1, rand(0, 0xffffff));
  img.fillRect(0, 0, 100, 40, 0x252632);
  // img.fillRect(rand(0, 100), rand(0, 40), rand(10, 35), rand(10, 35), rand(0, 0xffffff));
  img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff));
  //return img;
  //画曲线
  var w = img.w / 2;
  var h = img.h;
  var color = rand(0, 0xffffff);
  var y1 = rand(-5, 5); //Y轴位置调整
  var w2 = rand(10, 15); //数值越小频率越高
  var h3 = rand(4, 6); //数值越小幅度越大
  var bl = rand(1, 5);
  for (var i = -w; i < w; i += 0.1) {
    var y = Math.floor(h / h3 * Math.sin(i / w2) + h / 2 + y1);
    var x = Math.floor(i + w);
    for (var j = 0; j < bl; j++) {
      img.drawPoint(x, y + j, color);
    }
  }

  var p = "ABCDEFGHKMNPQRSTUVWXYZ3456789";
  var str = '';
  for (var i = 0; i < 4; i++) {
    str += p.charAt(Math.random() * p.length | 0);
  }

  var fonts = [BMP24.font12x24, BMP24.font16x32];
  // var fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
  var x = 15,
    y = 8;
  for (var i = 0; i < str.length; i++) {
    var f = fonts[Math.random() * fonts.length | 0];
    y = 8 + rand(-5, 5);
    img.drawChar(str[i], x, y, f, rand(0xaaaaaa, 0xffffff));
    x += f.w + rand(2, 8);
  }
  return {
    code: str,
    img
  }
}


module.exports = router