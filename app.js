var express  = require('express');
var bodyParser = require('body-parser');
var app      = express(); 								
var port  	 = 3000;

var cors = require('cors');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/president');

var part = require('./routes/part');

var app = express();
var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));


app.get('/parts', part.allParts);
app.get('/parts/:id', part.findById);
app.post('/parts/:id', part.addRoundToPartById);
app.post('/parts', part.createPart);
app.delete('/parts/:id', part.deleteById);

app.listen(port);										// let the parts begin!
console.log("Web server listening on port " + port);
