const Card = require('../models/cardDetailsmodel')
const User = require('../models/userModel')
const createCard = async (req, res) => {
    const { cardNumber, cvc, expiry, userId } = req.body
    console.log(req.user, 'sasas')
    try {
        if (!cardNumber || !cvc || !expiry) {
            return res.status(400).send({
                message: "some fields are missing",
                data: null
            })
        }
        const obj = {
            ...req.body,
            userId
        }
        const data = await Card.create(obj)
        const user = await User.findOneAndUpdate({ _id: userId }, { accountDetails: true })
        console.log(user)
        res.status(200).send({
            status: 200,
            message: "Logiged Ibn",
            data: user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}

const getCardDetails = async (req, res) => {
    try {
        const data = await Card.findOne({ userId: req.user })
        res.status(200).send({
            status: 200,
            data: data,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}
module.exports = { createCard, getCardDetails }