var express = require('express');
var app = express();
var todoController = require('./controllers/todo-controller');
// set up template engine
app.set('view engine', 'ejs');

// serve static files from "/public" directory
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(8080);
console.log('Listening on port 8080');
