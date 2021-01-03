const db = require('./db');
const express = require('express');
const route = express.Router()
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs')
//邮箱登录
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const transport = nodemailer.createTransport(smtpTransport({ //配置
  host: 'smtp.qq.com', // 服务 qq
  port: 465, // smtp端口 默认无需改动
  secure: true,
  auth: {
    user: '529153492@qq.com', // 用户名
    pass: 'jhyjbhgnvgmecbda' // SMTP授权码（老师这个码是我的邮箱码，保密一下嘿嘿）
  }
}));
const randomFns = function () { //生成随机的验证码
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += parseInt(Math.random() * 10)
  }
  return code
}
//图片的保存
const multer = require('multer');

const storage = multer.diskStorage({
  //存储的位置
  destination(req, file, cb) {
    cb(null, './uploads')
  },
  //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
  filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
})

// 传入storage 除了这个参数我们还可以传入dest等参数（这里没用上我就没传）
const upload = multer({
  storage
})



//这个模块是新增的内容，还没加上
route.post('/api/user/email', (req, res) => { //qq邮箱发送验证码
  let email = req.body.e_mail
  // console.log(email)
  let code = randomFns()
  transport.sendMail({
      from: '529153492@qq.com', // 发件邮箱
      to: email, // 收件列表
      subject: '验证你的电子邮件', // 标题
      html: `
      <p>你好！</p>
      <p>您正在注册登录账号</p>
      <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
      <p>***该验证码5分钟内有效***</p>` // html 内容
    },
    function (err, data) {
      if (err) {       // 如果没用，关闭连接池
        res.send(err)
        transport.close();
        return
      }
    })
  let obj = new db.code({
    radomCode: code
  })
  obj.save(err => {
    if (err) {
      res.send(err)
      return
    }
  })
  setTimeout(() => {
    db.code.remove({
      'radomCode': code
    }, (err) => {
      if (err) {
        res.send(err)
        return
      }
    })
  }, 1000 * 60 * 5)
  res.send({
    status: 1,
    mes: '请求成功'
  })
})

route.post('/api/user/verifyEmail', (req, res) => { //验证验证码 （验证格式在客户端进行）
  req = req.body
  // console.log(req);
  db.code.find({'radomCode': req.code}, (err, data) => {
    if(err) {
      res.send(err)
      return
    }
    if(data.length > 0) {
      res.send({status: 1, mes: '已成功'})
      db.code.remove({'radomCode': req.code}, (err) => {
        if(err) {
          res.send(err)
          return
        }
      })
    }
  })
})


route.post('/api/admin/checkUser', (req, res) => { //token验证
  req = req.body
  // console.log(req)
  db.User.find({
    'name': req.user_name,
    'token': req.token
  }, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
    if (data.length > 0) {
      let token = req.token
      let secretOrPrivateKey = "123456"
      jwt.verify(token, secretOrPrivateKey, (err, decode) => {
        if (err) {
          res.send({
            'status': 0
          })
        } else {
          res.send({
            'status': 1,
            'type': data[0]["type"],
            'user_name': data[0]["name"],
            'avatar': data[0]["avatar"],
            'nickName': data[0]["nickName"]
          });
        }
      })
    } else {
      res.send({
        'status': 0
      })
    }
  })
})

// , upload.single('file')
route.post('/api/upImg', upload.single('file'), (req, res) => { //上传图片
  const url = 'http://localhost:8888/' + req.file.filename
  res.send({
    url,
    status: 1
  })
})

route.post('/api/admin/updateUser', (req, res) => { //更新信息，添加头像
  // console.log(req.body)

  req = req.body
  db.User.find({
    'name': req.name
  }, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
    if (data.length > 0) {
      if (req.avatar == null) {
        data[0]['name'] = req.name
        data[0]['nickName'] = req.nickName
        db.User(data[0]).save(function (err) {
          if (err) {
            res.status(500).send()
            return
          }
          res.send({
            'status': 1,
            'msg': '更新成功',
            'user_name': data[0]["name"],
            'type': data[0]["type"],
            'nickName': data[0]["nickName"],
            'avatar': data[0]["avatar"]
          })
        })
      } else {
        data[0]['name'] = req.name
        data[0]['nickName'] = req.nickName
        data[0]['avatar'] = req.avatar
        db.User(data[0]).save(err => {
          if (err) {
            res.status(500).send()
            return
          }
          res.send({
            'status': 1,
            'msg': '更新成功',
            'user_name': data[0]["name"],
            'type': data[0]["type"],
            'nickName': data[0]["nickName"],
            'avatar': data[0]["avatar"]
          })
        })

      }
    } else {
      res.send({
        'status': 0,
        'msg': '更新失败'
      })
    }
  })
})

route.post('/api/admin/signIn', (req, res) => { //登录
  req = req.body
  db.User.find({
    'name': req.name,
    'password': req.password
  }, (err, dos) => {
    if (err) {
      res.send(err)
      return
    }
    if (dos.length > 0) {
      let content = {
        name: res.name
      } //生成token主题信息
      let secretOrPrivateKey = '123456'
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: '1h'
      })
      dos[0].token = token
      db.User(dos[0]).save(function (err) {
        if (err) {
          res.send(err)
          return
        }
        res.send({
          'status': 1,
          'msg': '登陆成功',
          'token': dos[0].token,
          'user_name': dos[0]["name"],
          'type': dos[0]["type"],
          'nickName': dos[0]["nickName"],
          'avatar': dos[0]["avatar"]
        })

      })
    } else {
      db.User.find({
        'name': req.name
      }, (err, data) => {
        if (err) {
          res.send(err)
          return
        }
        if (data.length > 0) {
          res.send({
            'status': 0,
            'msg': '密码不正确'
          })
        } else {
          res.send({
            'status': 0,
            'msg': '没有此账号'
          })
        }
      })

    }
  })



})

route.post('/api/admin/signUp', (req, res) => { //注册
  req = req.body
  if (req.name.length < 2) {
    res.send({
      'status': 0,
      'msg': '用户名太短'
    })
    return
  }
  if (req.password.length < 5) {
    res.send({
      'status': 0,
      'msg': '密码太短'
    })
    return
  }
  db.User.find({
    "name": req.name
  }, (err, data) => {
    if (err) {
      res.send(err)
    }
    if (data.length > 0) {
      res.send({
        'status': 0,
        'msg': '用户名已注册'
      });
    } else {
      db.User.find({
        'nickName': req.nickName
      }, (err, docs) => {
        if (err) {
          res.send(err);
          return
        }
        if (docs.length > 0) {
          res.send({
            'status': 0,
            'msg': '昵称已注册'
          });
        } else {
          let newUser = new db.User({
            date: req.date,
            name: req.name,
            password: req.password,
            nickName: req.nickName,
            avatar: null,
            // type: req.body.type
            type: 2 //1为管理员，2为游客,写死，新建管理员数据库直接改
          });
          newUser.save(function (err) {
            if (err) {
              res.send(err);
            } else {
              res.send({
                'status': 1,
                'msg': '注册成功'
              });
            }
          })
        }
      })
    }
  })
})

route.post('./api/find', (req, res) => { //查询文章
  req = req.body
  db.Article.find({"_id": req.id}, (err, data) => {
    if(err) {
      res.send(err)
      return
    }
      res.send(data)
  })
})

route.post('/api/admin/saveArticle', (req, res) => { //文章保存
  req = req.body
  // console.log(req)
  let newArticle = new db.Article(req)
  newArticle.save(err => {
    if (err) {
      res.send(err)
    } else {
      res.send({
        'status': 1,
        'msg': '保存成功'
      })
    }
  })
})

route.post('/api/articleList', (req, res) => { //获得所有文章的基本信息
  db.Article.find({}, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
    for (let i = 0; i < data.length; i++) {
      data[i]["comments"] = data[i]["comments"].length;
      data[i]["content"] = null;
    }
    res.send(data)
  })
})

route.post('/api/User', (req, res) => { //获得所有用户
  db.User.find({}, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
    res.send(data)
  })
})

route.post('/api/User/delect', (req, res) => { //删除用户
  // console.log(req.body)
  req = req.body
  db.User.remove({
    'name': req.name
  }, (err, data) => {
    if (err) {
      res.status(500).send()
      return
    }
    res.send({
      'status': 1,
      'msg': '删除成功'
    })

  })
})

route.post('/api/comment/new', (req, res) => { //评论
  req = req.body
  // console.log(req)
  db.Article.find({
    '_id': req._id
  }, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
    let {
      from_uid,
      from_uname,
      avatar,
      content,
      date
    } = req;
    let obj = {
      from_uid,
      from_uname,
      avatar,
      content,
      date,
      children: []
    }
    data[0].comments.push(obj)
    db.Article(data[0]).save(err => {
      if (err) {
        res.status(500).send()
        return
      }
      res.send({
        'status': 1,
        'msg': '发表成功'
      })
    })
  })
})

route.post('/api/comment/reply', (req, res) => { //回复
  req = req.body
  // console.log(req)
  db.Article.find({
    '_id': req._id
  }, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
    let {
      from_uid,
      from_uname,
      avatar,
      content,
      date
    } = req;
    let obj = {
      from_uid,
      from_uname,
      avatar,
      content,
      date,
    }
    let comment = data[0].comments
    comment.forEach((ele, index, arr) => {
      if (ele.date == req.sign) {
        arr[index].children.push(obj)
      }
    });
    db.Article(data[0]).save(err => {
      if (err) {
        res.status(500).send()
        return
      }
      res.send({
        'status': 1,
        'msg': '回复成功'
      })
    })

  })
})

route.post('/api/admin/deleteArticle', (req, res) => { //删除文章
  req = req.body
  db.Article.remove({
    _id: req._id
  }, (err, data) => {
    if (err) {
      res.status(500).send()
      return
    }
    res.send({
      'status': 1,
      'msg': '删除成功'
    })

  })
})


route.get('/api/articleDetail/:id', (req, res) => { //文章详情
  // console.log(req.params)
  db.Article.find({
    '_id': req.params.id
  }, (err, data) => {
    // console.log(data)
    if (err) {
      res.send(err)
      return
    }
    res.send(JSON.parse(JSON.stringify(data)))

  })
})

route.post('/api/user/addComment', (req, res) => { //增加用户的评论
  // const url = 'http://localhost:8888/' + req.file.filename
  // console.log(req.body)
  req = req.body
  let obj = new db.Comment({
    name: req.name,
    comments: req.comments,
    img: req.img,
    avatar: req.avatar,
    date: req.date
  })
  obj.save(err => {
    if (err) {
      res.send(err)
      return
    }
    res.send({
      status: 1,
      mes: '您已经发表成功了'
    })
  })
})

route.get('/api/user/getComment', (req, res) => { //获得评论
  // console.log('1')
  db.Comment.find({}, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
    res.send(data)
  })
})
module.exports = route