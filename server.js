require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const workoutroute = require('./route/workouts');
const userRoute = require('./route/user')

//express app
const app = express()
    //midlewere
app.use(express.json())

app.use((req, res, next) => {
        console.log(req.path, req.method)
        next()
    })
    //Router
app.use('/api/workout', workoutroute)
app.use('/api/user', userRoute)


app.get('/', (req, res) => {
        res.json({ mssd: 'welconm to the app' })
    })
    //connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen post
        app.listen(process.env.PORT, () => {
            console.log('connent db hello listen 4000 ', process.env.PORT);
        })
    })
    .catch((err) => { console.log(err) })