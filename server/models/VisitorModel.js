const visitorSchema = require("../schemas/VisitorSchema");


const Visitor = class{

    name;
    email;
    receptionist;
    phone;
    assignedEmployee;
    timeIn;
    timeOut;
    meetingStatus;

    constructor({ name, email, receptionist,phone }){
        this.name = name
        this.email = email
        this.phone = phone
        this.receptionist = receptionist
    }
    
    registerVisitor(){
        return new Promise(async(resolve, reject)=>{
            this.timeIn = new Date()
            
            const visitorObj = new visitorSchema({
                name: this.name,
                email: this.email,
                phone: this.phone,
                receptionist:this.receptionist,
                timeIn: this.timeIn
            }) 

            try {
                const visitorDB = await visitorObj.save()
                resolve(visitorDB)

            } catch (error) {
                reject(error)
            }
        })
    }

    static findEmailExist({email}) {
        return new Promise(async (resolve, reject) => {
          try {
            const visitorExist = await visitorSchema.findOne({email});
             
            if(visitorExist && visitorExist.email === email )
            reject("Email already in use")
    
        resolve()
          } catch (error) {
            reject(error)
          }
        });
      }

      static getVisitorByReceptionist(receptionist){

        return new Promise(async(resolve,reject)=>{
          
            try {
                const visitorDB = await visitorSchema.find({receptionist}) 
                resolve(visitorDB)
            } catch (error) {
                reject(error)
            }
        })
      }
      static getRegisteredVisitors(){

        return new Promise(async(resolve,reject)=>{
          
            try {
                const visitorDB = await visitorSchema.find({}) 
                resolve(visitorDB)
            } catch (error) {
                reject(error)
            }
        })
      }

    static  assignVisitorToEmployee({visitor,employee}){
        return new Promise(async (resolve, reject) => {
            try {
                this.assignedEmployee = employee

                const visitorDB = await visitorSchema.findOneAndUpdate({name:visitor},{assignedEmployee:this.assignedEmployee},{ new: true })

          resolve(visitorDB)
            } catch (error) {
              reject(error)
            }
          });
      }

      static checkMeetingStatus({visitor,status}){
        return new Promise(async (resolve, reject) => {
            try {
                 
                const visitorDB = await visitorSchema.findOneAndUpdate({name:visitor},{meetingStatus:status},{ new: true })

          resolve(visitorDB)
            } catch (error) {
              reject(error)
            }
          });

      }
      static addVisitorTimeout({visitor}){
        return new Promise(async (resolve, reject) => {
            try {
                const visitorDB = await visitorSchema.findOneAndUpdate({name:visitor},{timeOut: new Date()},{ new: true })

          resolve(visitorDB)
            } catch (error) {
              reject(error)
            }
          });

      }
}

module.exports = Visitor