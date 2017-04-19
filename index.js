var express = require('express');
var app = express();

app.use('/app/js', express.static(__dirname + '/app/js'));
app.use('/app/css', express.static(__dirname + '/app/css'));
app.use('/app/partials', express.static(__dirname + '/app/partials'));


app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/app/index.html', { root: __dirname });
});

app.listen(process.env.PORT || 8000); //the port you want to use
