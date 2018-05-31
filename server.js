var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
app.get('/posts', (req, res) => {
  Post.find((error, posts) =>{
    if (error){
      throw err;
    }
    res.send(posts);
  });
});

// 2) to handle adding a post
app.post('/posts', (req, res) => {
  var newPostDB = new Post(req.body);
  newPostDB.save((err, post) => {
    if (err){
      throw err;
    }    
    res.send(newPostDB);
  });
});

// 3) to handle deleting a post
app.delete('/posts/:id', (req, res) => {
  console.log(req.params.id);
   Post.findByIdAndRemove(req.params.id, (error,post) => {
    if (error){
      throw error;
    }
    res.send(post);
  });
});

// 4) to handle adding a comment to a post
app.post('/posts/:id/comments', (req, res) => {
  console.log(req.body);
  Post.findByIdAndUpdate(req.params.id, {$push: {"comments": req.body}}, (error,post) => {
    if (error){
      throw error;
    }
    res.send(post);   
  });  
});

// 5) to handle deleting a comment from a post
app.delete('/posts/:id/comments/:commentId', (req, res) => {
  console.log(req.params.commentId);
  Post.findByIdAndUpdate(req.params.id, {$pull: {"comments": {_id : req.params.commentId}}}, (error,post) => {
    if (error){
      throw error;
    }
    res.send(post);   
  });  
});



app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});






/////////////////////////////////////////////////////////////////////////////////////////
// var commentSchema = new mongoose.Schema({
//   text: String,
//   username: String,
// })
// var postSchema = new mongoose.Schema({
//   text: String,
//   username: String,
//   comments: [commentSchema]
// })
// var Post = mongoose.model('Post', postSchema)
// var aPost = new Post({ text: "My first post!!!" });
// aPost.comments.push({ text: "GGGGGGGG!", user: "chen" });
//  aPost.save(function(err, data) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.error(data);
//   }
// });
// var demoPost = new Post({ text: "this is demo" });
// var demoPost2 = new Post({ text: "this is demo2" });
// demoPost.save();
// demoPost2.save();
///////////////////////////////////////////////////////////////////////////////////////


// Post.find(function (error, result){
//   if(error) { return console.error(error); }
//   console.log (result);
// });