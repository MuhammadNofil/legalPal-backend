const router = require('express').Router()
const AuthControlller = require('../controller/authController')
const autenticate = require('../middleware/AuthenticateToken')

router.post('/signUp', AuthControlller.signUp) 
router.get('/chat', AuthControlller.chat)
router.get('/openAPi', AuthControlller.AI)
router.post('/login', AuthControlller.login)
router.patch('/updateProfile', AuthControlller.updateProfileInformation)
router.post('/resetPassword', AuthControlller.resetPassword)
router.post('/verifyOtp', AuthControlller.verifyotp)
router.patch('/resendotp', AuthControlller.resendOtp)
router.patch('/updatePassword', AuthControlller.updatePassword)
router.patch('/changePassword', autenticate, AuthControlller.changePassword)

module.exports = router