// 3. ROUTES/INDEX.JS

// 3.1 REQUIRES
const express= require('express')
const res = require('express/lib/response')
const router= express.Router()
//nos traemos los datos del esquema
const Task=require('../models/task')
// cada vez que accede a la ruta inicial, envia el ejs, que cofiguramso en la app, hay que renderizar

// 3.2 RENDERIZADO INICIAL DE LAS TAREAS
router.get('/', async (req,res) =>{
    // en la pagina de inicio debe esperar a recibir las tareas de base de datos
    const tasks = await Task.find()
    console.log(tasks)
    // aqui no solo renderizo sino que le paso el objeto tareas recibido en el await
    res.render('index',{
        tasks
    })
})
// 3.3 GUARDAR TAREA EN BASE DE DATOS

// guardar en base de datos es asyncrono porque lleva un tiempo
router.post('/add',async (req,res)=>{
    // le pasamos el req.body dentro del new task, que sera lo que guardemos en la bd
    const task=new Task(req.body)
    await task.save()
    // redireccionar al inicio
    res.redirect('/')
})
// echo no funciona
router.get('/turn/:title',async (req,res)=>{
    //console.log(req.params)
    const {title}=req.params
    const task = await Task.find({title:title})
    console.log(task)
    console.log(task.status)
    //task.status=true
    // asi lo colocamos al contrario de lo que tuviera
    task.status=!task.status
    //todos los metodos que llevan su tiempo hay que esperar
    await task.update()
    res.redirect('/')
    
})
// 3.4 BORRAR TAREA
// yo he creado un boton delete, ese boton como esta en un a (enlace ) me lleva a la ruta delete, la ruta delete, a la que le añado un el task[i]._id
router.get('/delete/:title', async (req,res) =>{
    console.log(req.params)
    const{title}=req.params
    await Task.deleteOne({title:title})
    res.redirect('/')
})
module.exports= router
