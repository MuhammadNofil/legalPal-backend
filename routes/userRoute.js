const router = require('express').Router()
const UserController = require('../controller/userController')
const autenticate = require('../middleware/AuthenticateToken')

router.get('/',autenticate,UserController.getUser)
router.patch('/',autenticate,UserController.updateMe)

module.exports=router