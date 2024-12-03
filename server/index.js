const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoDbSession = require('connect-mongodb-session')(session);
const cors = require('cors');
require('dotenv').config();
const clc = require('cli-color');
const EmployeeRouter = require('./controllers/EmployeeController');
const VisitorRouter = require('./controllers/VisitorController');
const MeetingRoomRouter = require('./controllers/MeetingRoomController');
const isAuth = require('./middlewares/isAuth');

const app = express()
const PORT = process.env.PORT || 8000;
const store = new mongoDbSession({
    uri: process.env.MONGO_URI,
    collection: 'sessions', 
  });
  mongoose 
  .connect(process.env.MONGO_URI) 
  .then(() => {
      console.log(clc.blueBright("Mongodb connected"));
    })
    .catch((err) => console.log(clc.redBright(err))); 
    
  app.use(cors({
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  );
 
app.use('/employee',EmployeeRouter)
app.use('/dashboard',isAuth,EmployeeRouter)
app.use('/visitor',VisitorRouter)
app.use('/meeting-room',MeetingRoomRouter)



app.get('/',(req,res)=>{
   return res.send("Server working")
})

app.listen(PORT,()=>{ 
    console.log(clc.yellowBright("http://localhost:8001/"))
})   