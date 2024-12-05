const express = require('express')

const MeetingRoomRouter   = express.Router()

MeetingRoomRouter.post('/register', async (req, res) => {
    const { roomname, capacity, visitor} = req.body;
 
    try {
      await validateMeetingCredentials({roomname, capacity, visitor});
    } catch (error) {
        console.log(error)
      return res.send({
        status: 400,
        message: error,
      });
    }
    try {
        await MeetingRoom.findMeetingExist({ email});
    } catch (error) {
        return res.send({
            status: 400,
            message: error,
          });
    }
    try {
      const visitorObj = new MeetingRoom({ name, email, receptionist, phone});
      const visitorDB = await visitorObj.registerVisitor();
        
      return res.send({
        status: 201,
        message: 'Registration Successful',
        data:visitorDB
      });
    } catch (error) {
        console.log(error)
      return res.send({
        status: 500,
        message: 'Something went wrong,please try again',
        error: error,
      });
    }
  });

module.exports = MeetingRoomRouter