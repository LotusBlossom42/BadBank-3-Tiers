const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://localhost:27017';
let db            = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');

    //new user
    var name = 'user' + Math.floor(Math.random()*10000)
    var email = name + '@mit.edu'

    //insert into customer table
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result) {
      console.log('Document insert')
    })

    var customers = db
      .collection('customers')
      .find()
      .toArray(function(err, docs) {
        console.log('Collection:', docs)

        //clean up
        client.close()
      })
  });

// // create user account
// function create(name, email, password){
//     return new Promise((resolve, reject) => {    
//         const collection = db.collection('users');
//         const doc = {name, email, password, balance: 0};
//         collection.insertOne(doc, {w:1}, function(err, result) {
//             err ? reject(err) : resolve(doc);
//         });    
//     })
// }

// // find user account
// function find(email){
//     return new Promise((resolve, reject) => {    
//         const customers = db
//             .collection('users')
//             .find({email: email})
//             .toArray(function(err, docs) {
//                 err ? reject(err) : resolve(docs);
//         });    
//     })
// }

// // find user account
// function findOne(email){
//     return new Promise((resolve, reject) => {    
//         const customers = db
//             .collection('users')
//             .findOne({email: email})
//             .then((doc) => resolve(doc))
//             .catch((err) => reject(err));    
//     })
// }

// // update - deposit/withdraw amount
// function update(email, amount){
//     return new Promise((resolve, reject) => {    
//         const customers = db
//             .collection('users')            
//             .findOneAndUpdate(
//                 {email: email},
//                 { $inc: { balance: amount}},
//                 { returnOriginal: false },
//                 function (err, documents) {
//                     err ? reject(err) : resolve(documents);
//                 }
//             );            


//     });    
// }

// // all users
// function all(){
//     return new Promise((resolve, reject) => {    
//         const customers = db
//             .collection('users')
//             .find({})
//             .toArray(function(err, docs) {
//                 err ? reject(err) : resolve(docs);
//         });    
//     })
// }