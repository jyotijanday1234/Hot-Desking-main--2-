const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectToMongo = require('./db')
const authRoutes = require('./routes/auth')
const roomRoutes = require('./routes/roomRoutes')
const bookedRoomRoutes = require('./routes/bookedRoomRoutes')
require('dotenv').config()
const app = express();
connectToMongo()
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

app.get('/',(req,res)=>{
    res.send('Inside index.js')
})
app.use("/user", authRoutes);
app.use("/room", roomRoutes);
app.use("/bookedrooms", bookedRoomRoutes);

app.listen(8000,()=>console.log('Server started at port 8000'))