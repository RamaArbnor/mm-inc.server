// require('dotenv').config

const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose')
const Bill = require('./models/billModel.js')
const User = require('./models/userModel.js')
require('dotenv').config


const app = express();  

app.use(express.json());
app.use(cors())

app.get("/users/:username", async (req, res) => {
    const results = await User.find({username: req.params.username})
    res.send(results)
})

app.post("/add/user", async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await User.create({username, password})
        res.status(200).json(user)
    } catch(e){ 
        res.status(400).json({error: e.message})

    }
});

app.get("/bills", async (req, res) => {
   const results = await Bill.find({paid: false})
   res.send(results)
});

app.post("/add/bill", async (req, res) => {
    const {name, data, description, amount, paid} = req.body
    
    try {
        const bill = await Bill.create({name, data, description, amount, paid})
        res.status(200).json(bill)
    } catch(e){ 
        res.status(400).json({error: e.message})

    }
});

app.patch('/pay/', async(req, res) => {

    const {id} = req.body

    try {
        await Bill.findByIdAndUpdate(id, {"paid": true}, {new: true})
        res.status(200).json({message: 'asd'})
    }catch(e) {
        res.status(400).json({error: e.message})
    }

})

app.delete('/delete/:id', async(req, res) => {

    const {id} = req.params

    try {
        await Bill.findByIdAndDelete(id)
        res.status(200).json({message: 'asd'})
    }catch(e) {
        res.status(400).json({error: e.message})
    }
})

// PORT
const PORT = process.env.PORT || 5000;

// connect to db
mongoose.connect('mongodb+srv://root:toor@cluster0.ykgrveo.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT} \nDataBase Connected`);
         });
    })
    .catch((e) => {
        console.log(e)
    })






