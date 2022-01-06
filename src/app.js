// 1. APP.JS
// 1. REQUIRES
// 1.1 EXPRESS
const express=require('express');
const app = express();
// 1.--- PATH
// segun el so , se usa para las rutas una barra u otra, para solucionarlo usamos path
//const path= require('path')
// 1.2 MORGAN
const morgan = require ('morgan')
// para la base de datos
// 1.3 MONGOOSE
const mongoose = require ('mongoose')
// 1.4 RUTAS
//de la carpeta rutas
const indexRoutes= require('./routes/index')

// 2. CONECTAR DB
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db=>console.log('Db connected'))
    .catch(err=>console.log(err))

// 3. CONFIGURACIONES
// 3.1 CONFIGURACION PUERTO
//configura la variable port con el puerto de sistema opertivao y si no existe coge el 4000
app.set('port',process.env.PORT||4000)
// 3.2 CONFIGURACION VISTAS
// cofigura las vistas, dirname se refiere a que parte del directorio actual
app.set('views', __dirname+ '/views')
// 3.3 CONFIGURACION VIEW ENGINE
//app.set('views', path.join(__dirname,'views'))
// traemos tambien ejs el motor de las views
app.set('view engine', 'ejs')

// 4. MIDDLEWARE
//funcion que se ejecuta antes de llegar a las rutas, sirven para dar permisos para ir a una ruta o no, sirve para procesar datos antes de que lleguen
// 4.1 MORGAN
app.use(morgan('dev'))
// para entender los datos que llegan de un formulario, extended false, porque el archivo no sera muy grande, si fueran fotos seria true
// 4.2 URLENCODED
app.use(express.urlencoded({extended:false}))
// 4.3 ROUTES
app.use('/',indexRoutes)

// 5. INICIO SERVIDOR
app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`);
})