var express = require('express');

var app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('dist'))

app.listen(PORT, function() {
    console.log('Express server listening on port:' + PORT);
});