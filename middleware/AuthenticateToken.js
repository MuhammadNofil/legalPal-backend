const jwt = require("jsonwebtoken");

const authenticate = async(req,res,next) =>{
    const token = req.headers.authorization
    const parsedToken = JSON.parse(token)
    if (!token) {
        return res.status(401).json({
            message : 'please provide token'
        })
    }
    console.log(parsedToken)
    const decodedToken = await jwt.verify(parsedToken, 'SECRET-KEY')
    if (!decodedToken) {
        return res.status(401).json({
            message : 'Unauthorized'
        })
    }
    const user = decodedToken?.id
    console.log(user) 
    req.user = user
    next()
}

module.exports =authenticate