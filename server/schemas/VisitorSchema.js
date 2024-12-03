const mongoose = require("mongoose")
const Schema = mongoose.Schema

const visitorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },    
    phone: {
        type: Number,
        required: true,
    },    
    timeIn: {
        type: Date,
        required: true
    },
    timeOut: {
        type: Date,
    },
    receptionist:{
        type:String,
        required:true
    },
    assignedEmployee: {
        type: String,
    },
    meetingStatus: {
        type: String,
        default:'Pending'
    },
})

module.exports = mongoose.model("visitor", visitorSchema)