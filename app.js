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
var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log('Listening on port ' + port);
});

