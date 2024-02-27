const Appointment = require('../models/appointmentModel')
const Room = require('../models/roomModel')
const Notification = require('../models/notification')
const creaetAppointment = async (req, res) => {
    try {
        console.log('try')
        const { medium, date, time, status, lawyer } = req.body
        if (!medium || !date || !time) {
            return res.status(400).send({
                message: "some fields are missing",
                data: null
            })
        }
        const alreadyExist = await Appointment.findOne({ user: req.user, lawyer })
        if (alreadyExist) {
            return res.status(400).send({
                message: "an appointment alredy exist with this laywer",
            })
        }
        req.body.user = req.user
        const data = await Appointment.create(req.body)
        await Room.create({
            lastMessage: "Tap to chat",
            activeDate: data?.date,
            status: "pending",
            users: [data?.user, data?.lawyer]
        })
        await Notification.create({
            sender: req?.user,
            reciever: lawyer,
            text: "booked  job with you"
        })
        res.status(200).send({
            status: 200,
            message: "Appointment created",
            data: data
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}

const gettodaysappointment = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const data = await Appointment.find({ lawyer: id })
        console.log(data)
        res.status(200).send({
            status: 200,
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}

const appointmentForUser = async (req, res) => {
    const { status } = req.query
    try {
        const appointment = await Appointment.find({
            user: req?.user,
            status
        }).populate('lawyer', 'userName  email city contactNo ').sort({ createdAt: -1 })
        res.status(200).send({
            status: 200,
            data: appointment
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}

const cancelAppointment = async (req, res) => {
    const { _id } = req.body

    try {
        const appointment = await Appointment.findOneAndUpdate(req.body, {
            status: 'cancel'
        })
        const data = await Appointment.find({
            user: req?.user,
            status: 'pending'
        }).populate('lawyer', 'userName  email city contactNo ').sort({ createdAt: -1 })
        res.status(200).send({
            status: 200,
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}
const getAssignmentByStatus = async (req, res) => {
    const { status } = req.query
    try {
        const appointment = await Appointment.find({
            lawyer: req?.user,
            status
        }).populate('user', 'userName  email city contactNo ')
        res.status(200).send({
            status: 200,
            data: appointment
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}

const completeAppointmment = async (req, res) => {
    const { _id } = req.body
    console.log(req.body[0]._id)
    try {
        const appointment = await Appointment.findOneAndUpdate({ _id: req.body[0]._id }, {
            status: 'completed'
        })
        const data = await Appointment.find({
            user: req?.user,
            status: 'pending'
        }).populate('lawyer', 'userName  email city contactNo ').sort({ createdAt: -1 })
        res.status(200).send({
            status: 200,
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}

module.exports = { completeAppointmment, creaetAppointment, gettodaysappointment, getAssignmentByStatus, appointmentForUser, cancelAppointment }