const express = require('express')
const router = express.Router()
const authController = require('../Controllers/auth-controller')

router.post('/signUp' , authController.singUp)
router.post('/login', authController.login)
router.post('/otp',authController.emailVerifictaion)
router.post('/code/:email',authController.otpVerifictaion)
router.post('/password/:email',authController.changePassword)

module.exports = router