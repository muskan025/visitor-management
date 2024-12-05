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
    visitorId:{
        type:Schema.Types.ObjectId,    
        ref:"visitor"
    },
})

module.exports = mongoose.model("meetingRoom",meetingRoomSchema)