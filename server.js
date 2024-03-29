// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userMiddleware = require('./lib/user-middleware');
userMiddleware(app)
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const browseRoutes = require('./routes/browse');
const logoutRoutes = require('./routes/logout');
const aboutRoutes = require('./routes/about');
const accountRoutes = require('./routes/account');
const helpRoutes = require('./routes/help');
const cartRoutes = require('./routes/cart');
const postProductRoutes = require('./routes/postProduct');
;

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/browse', browseRoutes);
app.use('/logout', logoutRoutes);
app.use('/about', aboutRoutes);
app.use('/account', accountRoutes);
app.use('/help', helpRoutes);
app.use('/cart', cartRoutes);
app.use('/postProduct', postProductRoutes);


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const user = req.session.user;
  res.render('index', { user });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
