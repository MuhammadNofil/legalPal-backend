const router = require('express').Router()
const CardController = require('../controller/cardController')
const autenticate = require('../middleware/AuthenticateToken')

router.post('/',autenticate,CardController.createCard)
router.get('/',autenticate,CardController.getCardDetails)

module.exports=router