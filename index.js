const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./api/routes/routes');

app.use(bodyParser.urlencoded({
    extended: 'true'
}));

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server Started. App running on port: ", PORT);
});

// routing
app.use('/api/v1', routes);

module.exports = app;
