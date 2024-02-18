const router = require('express').Router()
const ChatController = require('../controller/chatController')
const autenticate = require('../middleware/AuthenticateToken')

router.get('/',autenticate,ChatController.getRoom)
router.get('/messages/:id',autenticate,ChatController.getAllMessage)

module.exports=router