const express = require('express');
const Visitor = require('../models/VisitorModel');
const {validateVisitorCredentials } = require('../utils/authUtils');

const VisitorRouter   = express.Router()
 

VisitorRouter.post('/register', async (req, res) => {
    const { name, email, receptionist, phone} = req.body;
 
    try {
      await validateVisitorCredentials({name,email,receptionist,phone});
    } catch (error) {
        console.log(error)
      return res.send({ 
        status: 400,
        message: error,
      });
    }
    try {
        await Visitor.findEmailExist({ email});
    } catch (error) {
        
        return res.send({
            status: 400,
            message: error,
          });
    }
    try {
      const visitorObj = new Visitor({ name, email, receptionist, phone});
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

VisitorRouter.post('/visitors',async(req,res)=>{
     
    const {receptionist} = req.body

    try {
        const visitorDB = await Visitor.getVisitorByReceptionist(receptionist)

        if(!visitorDB){
            return res.send({
                status: 400,
                message: "No visitor registered yet",
              });
        }

        return res.send({
            status: 200,
            message: 'Read successful',
            data:visitorDB
           })


    } catch (error) {
        console.log(error)
        return res.send({
        status: 500,
        error: error,
        message: 'Something went wrong, please try again',
      });
    }
})

VisitorRouter.get('/visitors',async(req,res)=>{

    try {
        const visitorDB = await Visitor.getRegisteredVisitors()

        if(!visitorDB){
            return res.send({
                status: 400,
                message: "No visitor registered yet",
              });
        }

        return res.send({
            status: 200,
            message: 'Read successful',
            data:visitorDB
           })


    } catch (error) {
        console.log(error)
        return res.send({
        status: 500,
        error: error,
        message: 'Something went wrong, please try again',
      });
    }
})

VisitorRouter.post('/assign',async(req,res)=>{

    const {visitor,employee} = req.body

    if(!visitor || !employee){
        return res.send({
            status:400,
            message:"Please select both the attendees"
        })
    }

    try {
        const visitorDB = await Visitor.assignVisitorToEmployee({visitor,employee})

        return res.send({
            status:200,
            message:"Assigned Succesfully",
            data:visitorDB
        })
    } catch (error) {
        console.log(error)
        return res.send({
            status:500,
            message:"Something went wrong, please try again",
            error:error
        })
    }
})

VisitorRouter.post('/meeting-status',async(req,res)=>{

    const {visitor,status} = req.body
 
    if(!visitor || !status){
        return res.send({
            status:400,
            message:"Missing Data"
        })
    }

    try {
        const visitorDB = await Visitor.checkMeetingStatus({visitor,status})

        return res.send({
            status:200,
            message: `Meeting ${status}`,
            data:visitorDB
        })
    } catch (error) {
        console.log(error)
        return res.send({
            status:500,
            message:"Something went wrong, please try again",
            error:error
        })
    }
})

VisitorRouter.post('/timeout',async(req,res)=>{

    const {visitor} = req.body
 
   
    if(!visitor){
        return res.send({ 
            status:400,
            message:"Missing Data"
        })
    } 
 
    try {
        const visitorDB = await Visitor.addVisitorTimeout({visitor})
 
        return res.send({
            status:200, 
            data:visitorDB,
            message:'Timeout Recorded'
        })
    } catch (error) { 
        console.log(error)
        return res.send({
            status:500,
            message:"Something went wrong, please try again",
            error:error
        })
    }
})
module.exports = VisitorRouter