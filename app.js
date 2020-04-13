const {globalVariables} = require('./config/configuration');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const hbs = require('express-handlebars');
const {mongoDbUrl, PORT} = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json

// configuration mongodb
mongoose.connect(mongoDbUrl, {useUnifiedTopology : true, useNewUrlParser: true})
    .then(response => {
        console.log('mongodb connected succesfully');
    }).catch(err => {
        console.log('mongodb connection failed');
});


// configuration express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

// flash and session
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave:true
}));
app.use(flash());
app.use(globalVariables);

// setup express engine to use handlebars
app.engine('handlebars', hbs({
    defaultLayout:'default',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

// routes
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
    console.log("server running on port 3000");
});