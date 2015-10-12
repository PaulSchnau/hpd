var restify = require('restify');
var fs = require('fs');
var _ = require('lodash');
var pg = require('pg');


var conString = "postgres://mrbuttons@localhost/hpd";



var server = restify.createServer({
  name: 'Inside-HPD-Data'
});

server.listen(8080);

// this functions runs for all requests
server.use(function(req, res, next){
  return next();
});

var corporate_owners;
retrive_corporate_owners_json('top500.txt', function(data){
  corporate_owners = data;
});


server.get('/top500', function(req, res, next){
  res.send(corporate_owners);
  return next();
});


server.get('/id/:id', function(req, res, next){
  get_corporate_names(req.params.id, function(result){
    res.send(unique_names(result));
    next();
  });
});

//serves static files from html folder
server.get(/.*/, restify.serveStatic({
  'directory': __dirname + '/html',
  'default': 'index.html'
}));



function retrive_corporate_owners_json(fileName, callback) {
  fs.readFile(fileName, 'utf8', function(err, data){
    if (err) throw Error;
    callback(data);
  });
}

function get_corporate_names(id, callback) {
  var query = "SELECT corporationnames FROM corporate_owners WHERE id=$1";
  var a = [];
  a.push(Number(id));
  pg.connect(conString, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query(query, a, function(err, result){
      if (err){
        console.error('query error', err);
        callback(null);
      } else {
        //callback with results
        callback(result);
      }
      done();
    });
  });
}

//input: postgres result (object)
//output:unique names list (array)
function unique_names(result) {
  var names = result.rows[0].corporationnames;
  return _.uniq(names);
}

