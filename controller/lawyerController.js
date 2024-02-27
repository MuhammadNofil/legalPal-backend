const Appointment = require('../models/appointmentModel')
const User = require('../models/userModel')
const Review = require('../models/ReviewModel')

const getLawyers = async (req, res) => {
    const { filter, search } = req.query
    try {
        const dbQuery = {
            role: 'lawyer',
            ...(!!filter && filter !== "all" && {
                lawyerType: filter
            }),
            ...(!!search && {
                userName: { $regex: search, $options: 'i' }
            })
        }
        const data = await User.find(dbQuery)

        res.status(200).json({
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
const getLawyerById = async (req, res) => {
    const { lawyerId } = req.params
    try {
        const dbQuery = {
            role: 'lawyer',
            _id: lawyerId
        }
        const data = await User.findOne(dbQuery)
        const review = await Review.find({ lawyerId: lawyerId })
        console.log(review)
        res.status(200).json({
            status: 200,
            data: data,
            review
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}

const getDashboaerdData = async (req, res) => {
    console.log(req.user)
    const currentYear = new Date().getFullYear();
    console.log(currentYear); // 👉️ 2023

    const firstDay = new Date(currentYear, 0, 1);
    console.log(firstDay); // 👉️ Sun Jan 01 2023

    const lastDay = new Date(currentYear, 11, 31);
    console.log(lastDay); // 👉️ Sun Dec 31 2023
    try {
        const data = await Appointment.aggregate([
            {
                $match: {
                    status: "completed",
                    createdAt: {
                        $gte: firstDay,
                        $lte: lastDay
                    }
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: { month: "$month", year: "$year" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ])
        const monthlyCounts = Array(12).fill(0);
        console.log(monthlyCounts)
        data.forEach((item) => {
            const { month, count } = item._id;
            monthlyCounts[month - 1] = item.count;
        });

        const completedCount = await Appointment.countDocuments({ lawyer: req.user, status: 'completed' })
        const pendingCount = await Appointment.countDocuments({ lawyer: req.user, status: 'pending' })
        const cancelCount = await Appointment.countDocuments({ lawyer: req.user, status: 'cancel' })
        const RescheduleCount = await Appointment.countDocuments({ lawyer: req.user, status: 'reschedule' })
        res.status(200).json({
            status: 200,
            data: {
                completed: completedCount,
                pending: pendingCount,
                cancel: cancelCount,
                reschedule: RescheduleCount,
                graph: monthlyCounts
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}

module.exports = { getLawyers, getLawyerById, getDashboaerdData }