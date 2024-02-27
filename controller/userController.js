const User = require('../models/userModel')
const Review = require('../models/ReviewModel')

const updateMe = async (req, res) => {
    try {
        const data = await User.findOneAndUpdate({ _id: req.user }, req.body)
        console.log(data, 'dataa')
        console.log('dataa')
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
const getUser = async (req, res) => {
    console.log(req?.user, 'userrrrr')
    try {
        const data = await User.findOne({ _id: req.user })

        console.log(data, 'dataa')
        console.log('dataa')
        res.status(200).send({
            status: 200,
            data: data,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}

module.exports = { getUser, updateMe }