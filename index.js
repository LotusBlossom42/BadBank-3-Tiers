var express = require('express');
var app = express();
var cors = require('cors');
//data abstraction layer to connect to db
var dal = require('./dal.js')

//used to server static files from public directory
app.use(express.static('public'));
app.use(cors());

//placeholder without dal
// //create user account
// app.get('/account/create/:name/:email/:password', function (req, res) {
//   res.send({
//     name: req.params.name,
//     email: req.params.email,
//     password: req.params.password
//   })
// })

//create user account with dal
app.get('/account/create/:name/:email/:password', function (req, res) {
  //else create user
  dal.create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      console.log(user)
      res.send(user)
    })
})

// //login user
// app.get('/account/login/:email/:password', function (req, res) {
//   res.send({
//     email: req.params.email,
//     password: req.params.password
//   })
// })

// //all accounts before dal
// app.get('/account/all', function (req, res) {
//   res.send({
//     name: 'Peter Parker',
//     email: 'peter@mit.edu',
//     password: 'secret'
//   })
// })

//all accounts using dal
app.get('/account/all', function (req, res) {

  dal.all()
  .then((docs) => {
    console.log(docs)
    res.send(docs)
  })
})

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);


