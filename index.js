var http = require('http');
var request = require('request');
var querystring = require('querystring');
var serveStaticFiles = require('ecstatic')({ root: __dirname + '/static' });
var port = process.env.PORT || 8000;

function get_params(url){
	var pos = url.indexOf('?');
    if (pos < 0) { return {}; }

    return querystring.parse(url.substr(pos+1));
}

http.createServer(function (req, res) {
	if (req.url.indexOf('/open_beer') === 0) {
		options = get_params(req.url)
		params = {
			per_page : options['per_page'] || 10,
			page : options['page'] || 1
		}
		return request({url:'http://api.openbeerdatabase.com/v1/beers.json', qs:params}, function(err, response, body){
			if (err){
				res.write(SON.stringify([{'error':err}]));
			}else{
				res.writeHead(200, {
				  'Content-Type': 'application/json' 
				});
			}
	        res.write(JSON.stringify(JSON.parse(body)['beers']));
	        res.end();
		})
    }
    serveStaticFiles(req, res);
}).listen(port);

console.log('Listening on http://localhost:%d', port);
