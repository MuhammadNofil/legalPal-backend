const { default: mongoose } = require('mongoose');
const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const openAPi = require('openai')
const openai = new openAPi({ apiKey: process.env.CHAT });
const { createCustomer, addCustomerCard } = require('../utils/stripe')
const signUp = async (req, res) => {
    try {
        const { email, userName, role, password } = req.body
        if (!email || !userName || !password) {
            return res.status(400).send({
                message: "some fields are missing",
                data: null
            })
        }
        const alreadyExist = await User.findOne({ email })
        if (alreadyExist) {
            return res.status(400).send({
                message: "User Already Exist",
                data: null
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const cus = await createCustomer(email)
        req.body.cus = cus
        console.log(req.body.cus)
        const data = await User.create({ email, userName, role, password: hashedPassword })
        res.status(200).send({
            status: 200,
            message: "user created",
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
const login = async (req, res) => {
    console.log('login')
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).send({
                message: "some fields are missing",
                data: null
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({
                message: "wrong Email address",
                data: null
            })
        }
        const checkedpass = await bcrypt.compare(password, user?.password);
        if (!checkedpass) {
            return res.status(400).send({
                message: "Wrong Password",
                data: null
            })
        }
        const token = await jwt.sign({ id: user?._id }, 'SECRET-KEY')
        res.status(200).send({
            status: 200,
            message: "Logiged Ibn",
            data: user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
}

const resetPassword = async (req, res) => {
    const { email } = req.body
    try {
        if (!email) {
            return res.status(400).send({
                message: "some fields are missing",
                data: null
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({
                message: "Email Address Doesnt Exist",
                data: null
            })
        }
        const randomDecimal = Math.random();
        const random4DigitNumber = Math.floor(randomDecimal * 9000) + 1000;
        const data = await User.findOneAndUpdate({ _id: user?._id }, { $set: { Otp: random4DigitNumber } })
        res.status(200).send({
            status: 200,
            message: "Otp send to your email successfully",
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

const verifyotp = async (req, res) => {
    const { email, Otp } = req.body
    console.log(req.body)
    try {
        if (!email) {
            return res.status(400).send({
                message: "some fields are missing",
                data: null
            })
        }
        const user = await User.findOne({ Otp })
        if (!user) {
            return res.status(400).send({
                message: "wrong Otp",
                data: null
            })
        }
        res.status(200).send({
            status: 200,
            message: "Otp matched",
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

const updateProfileInformation = async (req, res) => {
    console.log(req.body)

    const { role, city, address, contactNo, userId } = req.body
    const id = new mongoose.Types.ObjectId(userId)
    console.log(id)
    try {
        if (!role || !city || !address || !contactNo || !userId) {
            return res.status(400).send({
                message: "please provide role",
                data: null
            })
        }
        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(400).send({
                message: "User does not exist",
                data: null
            })
        }
        const data = await User.findOneAndUpdate({ _id: user?._id }, req.body)
        res.status(200).send({
            status: 200,
            message: "profile updates successfully",
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

const resendOtp = async (req, res) => {
    const { email } = req.body
    console.log(email)
    try {
        const randomDecimal = Math.random();
        const random4DigitNumber = Math.floor(randomDecimal * 9000) + 1000;
        const data = await User.findOneAndUpdate({ email: email }, { Otp: random4DigitNumber })
        res.status(200).send({
            status: 200,
            message: "Otp send to your email successfully",
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


const updatePassword = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).send({
                message: "some fields are missing",
                data: null
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({
                message: "user Not Found",
                data: null
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const data = await User.findOneAndUpdate({ _id: user?._id }, { password: hashedPassword, Otp: null })
        res.status(200).send({
            status: 200,
            message: "Otp matched",
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


const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body
    console.log(req.user)
    try {
        if (!currentPassword || !newPassword) {
            return res.status(400).send({
                message: "some fields are missing",
                data: null
            })
        }
        const user = await User.findOne({ _id: req.user })
        if (!user) {
            return res.status(400).send({
                message: "User Not Found",
                data: null
            })
        }
        console.log(currentPassword)
        const comparePass = await bcrypt.compare(currentPassword, user.password)
        console.log(comparePass)
        if (!comparePass) {
            return res.status(400).send({
                status: 400,
                message: "Old password is wromg",
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        const data = await User.findOneAndUpdate({ _id: user?._id }, { password: hashedPassword, Otp: null })
        res.status(200).send({
            status: 200,
            message: "Otp matched",
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


// const chat = async (req, res) => {
//     try {
//         const response = await axios.get('http://127.0.0.1:8000/api/?q=hi')
//         console.log(response?.data)
//         res.status(200).send({
//             status: 200,
//             message: "Otp matched",
//             data: response,
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             message: error.message,
//             data: null
//         })
//     }
// }
const chat = async (req, res) => {
    const { q } = req.query
    console.log(q)
    axios.get(`http://127.0.0.1:8000/api/?q=${q}`)
        .then((response) => {
            // Extract the data from the Axios response object
            const responseData = response.data;
            console.log(response?.data)
            const responseMessage = responseData.split("[RESPONSE]:")[1].trim();

            // Send the extracted data as the response to the client
            res.status(200).send(responseMessage);
        })
        .catch((error) => {
            // Handle errors and send an error response to the client
            console.log(error);
            res.status(500).send({ message: error.message });
        });

    // try {
    //     console.log(response?.data)
    //     res.status(200).send({
    //         status: 200,
    //         message: "Otp matched",
    //         data: response.data, // Use response.data instead of response
    //     })
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).send({
    //         message: error.message,
    //         data: null
    //     })
    // }
}


const AI = async (req, res) => {
    const { q } = req.query
    console.log('hello')
    const question = q + " " + "Don’t justify your answers. Don’t give information not mentioned in the CONTEXT INFORMATION . and kindly provide information according to pakistani law please be preciesed if the question includes any country name rather then pakistan just write out of my domain"
    console.log(question)
    try {
        const completion = await openai.chat.completions.create({

            messages: [{ role: "assistant", content: question }],
            model: "gpt-4-0125-preview",
        });

        res.status(200).send({
            data: completion.choices[0].message.content
        })
        console.log(completion.choices[0].message.content)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error
        })
    }
}


const addCard = async (req, res) => {
    const { pmId } = req.body
    const user = await User.findOne({ _id: req.user })
    await addCustomerCard(pmId, user?.cus)
    return res.sendStats(200).send({ message: 'card Added' })
}

module.exports = { AI, signUp, chat, changePassword, updateProfileInformation, login, resetPassword, verifyotp, updatePassword, resendOtp, addCard }

