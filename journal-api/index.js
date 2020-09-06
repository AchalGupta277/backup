/** Setting basepath to be used everywhere for importing */
global.__basePath = process.cwd()+'/';

const express = require('express');
const cors = require('cors')

const routes = require('./routes');
const Database = require('./database');

/** Create express app */
const app = express();


/* Middlewares */
require('dotenv').config();
app.use(express.json()); // BODYPARSER
app.use(cors()); // Enable All CORS Requests
/* Middlewares ends */

// Injecting all routes to the app
app.use('/', routes);

const database = new Database();
const dbInstance = database.getInstance();

/** Listen express app */
app.listen(process.env.PORT, () => {
    console.log('App started on port ' + process.env.PORT);
})