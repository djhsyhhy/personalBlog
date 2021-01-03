const express = require('express')
const app = express()
const route = require('./app')
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors())
app.use(route)
app.use(express.static('uploads'))
// app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(function (err, req, res, next) {
  return res.status(err.status || 500).send({
    message: err.message,
    error: {},
    title: 'error'
  });
});
app.listen(8888)
console.log('8888 ....')