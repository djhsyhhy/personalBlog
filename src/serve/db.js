
var mongoose = require('mongoose')
var db = mongoose.connection
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('open')
})
mongoose.connect('mongodb://localhost/blog');

const userSchema = new mongoose.Schema({ 
  name: String,
  password: String,
  nickName: String,
  type: String,//1管理员，2游客
  token: String,
  avatar: String, //头像，用的是base64
  date: String,//时间 
})
//文章
const articleSchema = new mongoose.Schema({
  title: String,//标题
  date: String,//时间 
  category: Array,//分类
  gist: String,//简介
  content: String,//文章内容
  comments: Array,//评论
  imgUrl: String,//图片地址
})
//demo
// const demoSchema = new mongoose.Schema({
//   title: String,
//   date: String,
//   file: String,
//   pic: String,
//   gist: String,
// })
// ; //将该Schema发布为Model 评论的内容
const UserComment = new mongoose.Schema({
  name: String,
  date: String,
  avatar: String,
  comments: String,
  img: String,
})
const authCode = new mongoose.Schema({
  radomCode: String
})
const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema),
  Comment: mongoose.model('Comment', UserComment),
  code: mongoose.model('code', authCode),
}

module.exports = Models;