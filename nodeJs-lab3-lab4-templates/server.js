const express = require('express');
const app = express();
const path = require('path');

const pg = require('pg')
const db = require('./db')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const router = require('./routes/router');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new pgSession({
        pool: db.pool,
    }),
    secret: 'fer-web-lab4',
    resave: false,
    saveUninitialized: true,
}));

app.use('/register', router);

app.listen(3000);