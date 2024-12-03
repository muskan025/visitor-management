const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  meetingRoomSchema = Schema({
    roomName: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
        required: true,
    },
    

})

module.exports = mongoose.model("meetingRoom",meetingRoomSchema)