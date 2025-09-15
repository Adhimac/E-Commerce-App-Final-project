const express = require('express')
const router = express.Router()
const authController = require('../Controllers/auth-controller')

// router.post("/signup", (req, res) => {
//   const { name, email, password } = req.body;

//   console.log("Signup request received:", { name, email, password });

//   // You can save the user to DB here, e.g., MongoDB
//   res.json({
//     success: true,
//     message: "Account created successfully!",
//     user: { name, email },
//   });
// });
router.post('/signup' ,authController.singUp)

router.post('/login', authController.login)
router.post('/otp',authController.emailVerifictaion)
router.post('/code/:email',authController.otpVerifictaion)
router.post('/password/:email',authController.changePassword)

module.exports = router