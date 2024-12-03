const bcrypt = require("bcrypt");
const employeeSchema = require("../schemas/EmployeeSchema");
const visitorSchema = require("../schemas/VisitorSchema");

const Employee = class {
    name;
    email;
    password;
    phone;
    role;

    constructor({ name, email, password,phone,role }) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
    }

    registerUser(){
        return new Promise(async(resolve, reject)=>{

            const hashedPassword = await bcrypt.hash(this.password, parseInt(process.env.SALT))

            const employeeObj = new employeeSchema({
                name: this.name,
                email: this.email,
                password: hashedPassword,
                phone:this.phone,
                role:this.role,
            }) 

            try {
                const employeeDB = await employeeObj.save()
                resolve(employeeDB)

            } catch (error) {
                reject(error)
            }
        })
    }

    static findEmailExist({email}) {
        return new Promise(async (resolve, reject) => {
          try {
            const employeeExist = await employeeSchema.findOne({email});
             
            if(employeeExist && employeeExist.email === email && employeeExist.role === 'receptionist'){
              const deletedUser = await employeeSchema.findOneAndDelete({email})
              console.log(deletedUser)
            }
            else if(employeeExist && employeeExist.email === email )
            reject("Email already in use")
    
        resolve()
          } catch (error) {
            reject(error)
          }
        });
      }

      static findRegisteredEmail({email}){

        return new Promise(async(resolve,reject)=>{
          try{
    
            const employeeDB = await employeeSchema.findOne({email})
      
            if(!employeeDB) reject("User does not exist, please register first")
           
            resolve(employeeDB)
          }
          catch(error){
            reject(error)
          }
        })
      }

      static getRegisteredEmployees(){

        return new Promise(async(resolve,reject)=>{

            try {
                const employeesDB = await employeeSchema.find({role:'employee'}) 
              
                resolve(employeesDB)
            } catch (error) {
                reject(error)
            }
        })
      }

      static getRegisteredReceptionists(){
        return new Promise(async(resolve,reject)=>{
            try {
                const employeesDB = await employeeSchema.find({role:'receptionist'}) 
                resolve(employeesDB)
            } catch (error) {
                reject(error)
            }
        })
      }

      static meetingRequestStatus(){
        return new Promise(async(resolve,reject)=>{

            try {
                const employeesDB = await employeeSchema.find({role:'receptionist'}) 
                resolve(employeesDB)
            } catch (error) {
                reject(error)
            }
        })
      }

      static getEmployeeMeetings(employee){
        return new Promise(async(resolve,reject)=>{
            
            try {
                const employeeDB = await visitorSchema.find({assignedEmployee:employee}) 
                resolve(employeeDB)
            } catch (error) {
                reject(error)
            }
        })
      }

      static removeReceptionists(id){
        return new Promise(async(resolve,reject)=>{
            
            try {
                const employeeDB = await employeeSchema.findByIdAndDelete(({_id: id})) 
                resolve(employeeDB)
            } catch (error) {
                reject(error)
            }
        })
      }

      static addReceptionists({name,email}){
        return new Promise(async(resolve,reject)=>{
            
          const employeeObj = new employeeSchema({
            name: name,
            email:email,
            role:'receptionist',
        }) 


        try {
            const employeeDB = await employeeObj.save()
            resolve(employeeDB)

        } catch (error) {
            reject(error)
        } 
        })
      }
}

module.exports = Employee