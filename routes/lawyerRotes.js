const router = require('express').Router()
const LawyerController = require('../controller/lawyerController')
const autenticate = require('../middleware/AuthenticateToken')
router.get('/',LawyerController.getLawyers)
router.get('/dashboard',autenticate,LawyerController.getDashboaerdData)
router.get('/:lawyerId',LawyerController.getLawyerById)

module.exports=router