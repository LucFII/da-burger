/* var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "burgerDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

  app.get('/', function (req, res) {
    res.send('Hello World!')
  });
  
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });

  var hbs = exphbs.create({ /* config  }); */
  
  // Register `hbs.engine` with the Express app.
  /*app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars'); */

  //=============== */
  var express = require("express");
  var bodyParser = require("body-parser");
  var methodOverride = require("method-override");
  
  // bring in the models
  var db = require("./models");
  
  var app = express();
  // Serve static content for the app from the "public" directory in the application directory.
  app.use(express.static(__dirname + "./public"));
  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  // override with POST having ?_method=DELETE
  app.use(methodOverride("_method"));
  var exphbs = require("express-handlebars");
  
  app.engine("handlebars", exphbs({
    defaultLayout: "main"
  }));
  app.set("view engine", "handlebars");
  
  var routes = require("./controllers/burger_controller.js");
  
  app.use("/", routes);
  app.use("/update", routes);
  app.use("/create", routes);
  
  
  // listen on port 3000
  var port = process.env.PORT || 3000;
  db.sequelize.sync().then(function() {
    app.listen(port);
  });  