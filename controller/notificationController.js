const Notification = require('../models/notification.js')

const getNotification = async(req,res) =>{
    try{
        const noti = await Notification.find({
            reciever : req.user
        })
        return res.status(200).json({data : noti})
    }
    catch(err){
        return res.status(500).json({err : err})
    }
}

module.exports = {getNotification}