require('./config/db');
const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const routes = require('./api/routes/routes');

var corsOptions = {
    origin: JSON.parse(process.env.ALLOWED_HOSTS),
    optionsSuccessStatus: 200,
    methods: process.env.ALLOWED_METHODS
}
app.use(cors());

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
