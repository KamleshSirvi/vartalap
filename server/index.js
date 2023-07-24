const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./Routes/userRoute')
const chatRoute = require('./Routes/chatRoute')
const messageRoute = require('./Routes/messageRoute')

// config env file for reading data from env file
require("dotenv").config()

const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// middleware functions
// application use the json data and cors use for sending data to the frontend from backend
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute)

// CRUD operation
app.get('/', (req, res) =>{
    res.send("welcone to our chat app APIs");
})


app.listen(port, (req, res) => {
     console.log(`server running on port: ${port}`);
});

// connect mongobd
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    
  }).then(() => {
    console.log(`mongodb connection stablish`);
}).catch((error) => console.log(`mongodb connection failed`, error.message));