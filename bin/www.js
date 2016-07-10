/* jshint node: true */
var app = require('../');
var chalk = require('chalk'); //used for prettier command line output

app.set('port', process.env.PORT || 3000);
console.log("Starting server at port " + app.get("port"));

var server = app.listen(app.get('port'), function () {
  console.log(chalk.green('Express server now listening on port ' + server.address().port)); 
});

