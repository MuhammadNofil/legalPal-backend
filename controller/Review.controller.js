const Review = require('../models/ReviewModel')

const creeateReview = async (req, res) => {
    try {
        req.body.user = req.user
        console.log(req.body)
        const review = await Review.create(req.body)
        return res.status(200).send({ message: 'review creatd successfully' })
    }
    catch (err) {
        return res.status(500).send({ message: err })
    }
}

const getReview = async (req, res) => {
    try {
        const review = await Review.find({ lawyerId: req.user._id })
        return res.sendStauts(200).send({ data: review })
    } catch (error) {
        return res.status(500).send({ message: err })
    }
}
module.exports = { creeateReview, getReview }