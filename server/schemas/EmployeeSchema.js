const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  employeeSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("employee",employeeSchema)