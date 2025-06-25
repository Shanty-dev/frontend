const express = require('express')
    //controler function
const { loginUser, signupUser } = require('../controler/userControler')


const router = express.Router()
    //login 
router.post('/login', loginUser)

//sign
router.post('/signup', signupUser)

module.exports = router