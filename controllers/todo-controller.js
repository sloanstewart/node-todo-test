var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://test:test@ds139362.mlab.com:39362/node-todo-test');

// create schema and model for mongoDB
var todoSchema = new mongoose.Schema({
  item: String
});
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/', function(req, res){
    // get data from mongoDB and pass it to the view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/', urlencodedParser, function(req, res){
    // get data from view and add to mongoDB
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    })
  });

  app.delete('/:item', function(req, res){
    //delete item from database
    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    })
  });

};
