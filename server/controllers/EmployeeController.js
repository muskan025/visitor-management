const express = require('express');
const bcrypt = require('bcrypt')
const Employee = require('../models/EmployeeModel');
const {validateEmployeeCredentials } = require('../utils/authUtils');

const EmployeeRouter = express.Router()
 
EmployeeRouter.post('/register', async (req, res) => {
    const { name, email, password,phone, role } = req.body;
    const isRegister = true
    
    try {
      await validateEmployeeCredentials({ name, email, password,phone, role, isRegister });
    } catch (error) {
      return res.send({
        status: 400,
        message: error,
      });
    }
  
    try {
        await Employee.findEmailExist({ email});
    } catch (error) {
        return res.send({
            status: 400,
            message: error,
          });
    }
    try {       
      const employeeObj = new Employee({ name, email, password,phone, role });
      const employeeDB = await employeeObj.registerUser();
        
      return res.send({
        status: 201,
        message: 'Registration Successful',
        data:employeeDB
      });
    } catch (error) {
      return res.send({
        status: 500,
        message: 'Something went wrong,please try again',
        error: error,
      });
    }
  });

EmployeeRouter.post('/login',async(req,res)=>{

    const {email,password} = req.body


    const isRegister = false
    try {
        await validateEmployeeCredentials({email, password,isRegister});
      } catch (error) {
        return res.send({
          status: 400,
          message: error,
        });
      }

      let employeeDb = {};
  try {
    employeeDb = await Employee.findRegisteredEmail({email});
  } catch (error) {
    return res.send({ 
         status: 400,
         message: error,
          });
  }

  try {
    const isMatch = await bcrypt.compare(password, employeeDb.password);

    if (!isMatch) {
      return res.send({
        status: 400,
        message: 'Password does not match',
      });
    }

    req.session.isAuth = true
    req.session.user = {
        userId: employeeDb._id,
        name: employeeDb.name,
        email: employeeDb.email,
        role:employeeDb.role
       };

       return res.send({
        status: 200,
        message: 'login successful',
        data: req.session.user
       })

  } catch (error) {
    console.log(error)
    return res.send({
        status: 500,
        message: 'Something went wrong, please try again',
        error: error,
      });
  }


})


EmployeeRouter.get('/employees',async(req,res)=>{
     
    try {
        const employeesDB = await Employee.getRegisteredEmployees()

        if(!employeesDB){
            return res.send({
                status: 200,
                message: "No employee registered yet",
              });
        }

        return res.send({
            status: 200,
            message: 'Read successful',
            data:employeesDB
           })


    } catch (error) {
        return res.send({
        status: 500,
        message: 'Something went wrong, please try again',
        error: error,
      });
    }
})

EmployeeRouter.get('/receptionists',async(req,res)=>{
     
    try {
        const employeesDB = await Employee.getRegisteredReceptionists()

        
        if(!employeesDB){
            return res.send({
                status: 200,
                message: "No receptionist registered yet",
              });
        }

        return res.send({
            status: 200,
            message: 'Read successful',
            data:employeesDB
           })


    } catch (error) {
        return res.send({
        status: 500,
        error: error,
        message: 'Something went wrong, please try again',
      });
    }
})

EmployeeRouter.get('/employee-meetings/:name',async(req,res)=>{
     
    const employee = req.params.name 

    try {
        const employeeDB = await Employee.getEmployeeMeetings(employee)

        if(!employeeDB){
            return res.send({
                status: 200,
                message: "No meetings to show",
              });
        }

        return res.send({
            status: 200,
            message: 'Read successful',
            data:employeeDB
           })

    } catch (error) {
        return res.send({
        status: 500,
        error: error,
        message: 'Something went wrong, please try again',
      });
    }
})

EmployeeRouter.post('/remove-receptionist',async(req,res)=>{
     
    const {id} = req.body

    try {
        const employeeDB = await Employee.removeReceptionists(id)

        if(!employeeDB){
            return res.send({
                status: 400,
                message: "No receptionist found",
              });
        }

        return res.send({
            status: 200,
            message: 'Read successful',
            data:employeeDB
           })

    } catch (error) {
        return res.send({
        status: 500,
        error: error,
        message: 'Something went wrong, please try again',
      });
    }
})

EmployeeRouter.post('/add-receptionist',async(req,res)=>{
     
  const {name,email} = req.body
 
  try {
      const employeeDB = await Employee.addReceptionists({name,email})

      return res.send({
          status: 200,
          message: 'Read successful',
          data:employeeDB
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

module.exports = EmployeeRouter