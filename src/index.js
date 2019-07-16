const express = require('express');
const app = express();

//1. modulo propio de node.js que permite manejar las rutas es decir las direcciones de las carpetas del servidos y del sistema operativo
//2. modulo mongoose que permite conectarse a mongodb
//3. Permite configurar la manera como me voy a autenticar en el sistema
//4. Conect flash
//5. morgan
//6. Administrar las cookies
//7. Procesar la informacion desde el navegador al servidor
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

//base de datos
const { url } = require('./config/database');

//conectarmnos a la base de datos
mongoose.connect(url,{
});

require('./config/passport')(passport);



//settings
app.set('port', process.env.PORT || 3000 );
app.set('views', path.join(__dirname,'views')); // las vistas estaran en una carpeta llamadas views
app.set('view engine', 'ejs'); //motor de plantillas

//middelwares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'mediO',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./server/routes')(app, passport);

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});