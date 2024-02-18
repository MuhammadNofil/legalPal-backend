const router = require('express').Router()
const NotificationController = require('../controller/notificationController')
const autenticate = require('../middleware/AuthenticateToken')
router.get('/',autenticate,NotificationController.getNotification)

module.exports=router