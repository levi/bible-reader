/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer(),
    http = require('http'),
    querystring = require('querystring');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

var defaultOptions = {
  host: 'www.esvapi.org',
  port: 80,
  path: '/v2/rest/passageQuery'
};

var queryOptions = {
  'key': "IP",
  'include-footnotes': false,
  'include-audio-link': false,
  'passage': ""
};

var requestOptions = function(reference) {
  var newOptions = queryOptions,
      ret = defaultOptions;

  newOptions.passage = reference || "Genesis 1";
  ret.path += "?"+querystring.stringify(newOptions);
  return ret;
};

app.get('/', function(req, res) {
  res.redirect("/Genesis 1");
});

app.get('/:reference', function(req, res) {
  var scripture = "";
  http.get(requestOptions(req.params.reference), function(response) {
    response.setEncoding('utf8');
    response.on('data', function(chunk) {
      scripture += chunk;
    });
    response.on('end', function() {
      res.render('index', {
        scripture: scripture
      });
    });
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  var port = process.env.PORT || 3000;
  app.listen(port, function() {
    console.log("Express server listening on port " + port);
  });
}