const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');


// App initializing
const app = express();
// Load Route
const users = require('./routes/users');
const products = require('./routes/products');
const dashboard = require('./routes/dashboard');


// Setting Passport
require('./config/passport')(passport);



//------------------------------MIDDLEWARES-----------------------------------
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Express-Hnadlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Express-Session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))
// Connect-Flash middleware
app.use(flash());

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());


// Global Variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.errors = req.flash('errors');
    res.locals.user = req.user || null;
    next();
});


// Loading Model
require('./models/User');
const User = mongoose.model('users');
require('./models/Product');
const Product = mongoose.model('products');


// Connection to mongodb
mongoose.connect('mongodb://localhost/echemist',{ useNewUrlParser: true },()=>{
    console.log('Connection Successfull');
});




// Route for index
app.get('/',(req,res)=>{
    res.render('index');
});




// Using routes
app.use('/users', users);
app.use('/products', products);
app.use('/dashboard', dashboard);


// Setting Port
const port = process.env.port ||3000;
app.listen(port,()=>{
    console.log(`Server is running on 127.0.0.1:${port}`);
});