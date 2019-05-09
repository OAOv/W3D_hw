var shelljs = require('shelljs');
var express = require('express');
var app = express();


///////
//app.use(express.static(__dirname+'/public'));
//app.use(express.static(__dirname + 'vendor'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/hw4.html');
});

app.get ('/api', function (req, res) {

	var Rx = req.query.Rx;
	var Ry = req.query.Ry;
	var Rw = req.query.Rw;
	var Rh = req.query.Rh;
	var Cx = req.query.Cx;
	var Cy = req.query.Cy;
	var rad = req.query.rad;
		
	shelljs.exec('a.exe ' + Rx + ' ' + Ry + ' ' + Rw + ' ' + Rh + ' ' + Cx + ' ' + Cy + ' ' + rad,
				 function(status, output) {
	  console.log('Exit status:', status);
	  console.log('Program output:', output);
	  //console.log("Rx: "+Rx+",Ry: "+Ry+",Rw: "+Rw+",Rh: "+Rh+",Cx: "+Cx+",Cy: "+Cy+",rad: "+rad);

      var output = {
        status: status,
        output: output
      };

		
      /*
        The response header for supporting CORS:
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      */

	  res.writeHead(200, {
		  "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
	  });	
	
	  res.write( JSON.stringify(output) );
	  res.end();

	});

});


// or simply
// app.listen (1337); 
// will do

var server = app.listen (1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});

