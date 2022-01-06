// 2. MODELS/TASK.JS

// donde ponemos el esquema de como van a ser las tareas en la bbdd

const mongoose = require('mongoose')

// schema, como va a ser los datos
const Schema= mongoose.Schema

const TaskSchema=new Schema({
    title:String,
    description: String,
    status:{
        type:Boolean,
        default: false
    }
})
// lo exportamos
module.exports = mongoose.model('tasks', TaskSchema)