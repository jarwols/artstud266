var bodyParser = require('body-parser');
var https = require('https');
var express = require('express');
var path = require('path');
var results = ''; 

var app = express();

app.use(bodyParser.json());

// serve all files out of public folder
app.use(express.static('public'));

app.get('/user', function (req, res) {
	var response = res; 
	console.log(req.query.username);
	https.get("https://www.instagram.com/" + req.query.username + "/media/", function(res) {
	  // console.log('STATUS: ' + res.statusCode);
	  // console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    // console.log('BODY: ' + chunk);
	    results += chunk;
	  });
	  res.on('error', function (chunk) {
	    console.log('Error:');
	    // results += chunk;
	  });
	  res.on('end', function () {
	    response.send(results); 
	  });
	});
});

app.listen(3000, function () {
  console.log('welcome to your face');
});