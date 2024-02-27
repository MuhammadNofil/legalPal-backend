const router = require('express').Router()
const ReviewController = require('../controller/Review.controller')
const autenticate = require('../middleware/AuthenticateToken')

router.post('/', autenticate, ReviewController.creeateReview)

module.exports = router