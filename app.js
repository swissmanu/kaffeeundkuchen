var express = require('express')
	,search = require('./server/search')
	,onair = require('./server/onair')
	,voter = require('./server/voter')
	,app = express();

app.use(express.logger());
app.use(express.static(__dirname + '/client'));

app.get('/api/search', search());
app.get('/api/tracks', onair());
app.put('/api/tracks/:id/vote', voter());

app.listen(80);