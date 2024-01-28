const router = require('express').Router()
const AppointmentController = require('../controller/appointmentController')
const autenticate = require('../middleware/AuthenticateToken')
router.post('/', autenticate, AppointmentController.creaetAppointment)
router.get('/getAllData', autenticate, AppointmentController.getAssignmentByStatus)
router.get('/getUserData', autenticate, AppointmentController.appointmentForUser)
router.get('/getAllData/:id', autenticate, AppointmentController.gettodaysappointment)
router.patch('/cancel', autenticate, AppointmentController.cancelAppointment)

module.exports = router