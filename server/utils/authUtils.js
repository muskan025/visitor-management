const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const validateEmployeeCredentials = ({ email, password, name, role,isRegister}) => {
  return new Promise((resolve, reject) => {

    if (isRegister && !name)
      reject("Please enter your name");

    if (!email)
      reject("Please enter your email");

    if (!password)
      reject("Please enter your password");

    if(isRegister && !role)
        reject("Please enter your role");
     
     if (typeof email !== "string") 
        reject("Invalid Email");
    if (isRegister && typeof name !== "string") 
        reject("Name should be in letters");
     if (typeof password !== "string")
       reject("Please include letters and special characters for a strong password");
 
    if (password.length <= 5 || password.length > 20)
      reject("Password should be of 6-20 characters long");

    if (!validator.isEmail(email)) reject("Format of email is wrong");

    resolve();
  });
};

const validateVisitorCredentials = ({name,email,receptionist})=>{
  
  return new Promise ((resolve,reject)=>{
    if(!name) reject("Please enter your name");
    if(!email) reject("Please enter your email");
    if(!receptionist) reject("Please enter receptionist name");

    if (typeof name !== "string" || typeof receptionist !== "string") 
        reject("Name should be in letters");

    if (!validator.isEmail(email)) reject("Format of email is wrong");

    resolve()
  })
}


module.exports = {validateEmployeeCredentials,validateVisitorCredentials}