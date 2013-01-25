var express = require('express')
  ,connect = require('connect')
  ,app = express();


app.configure(function(){
  app.use(express.static(__dirname + '/client'));
  app.use(connect.logger('dev'));
});

app.listen(80);