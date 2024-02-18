const Room = require('../models/roomModel')
const Chat = require('../models/chatModel')


const getRoom = async(req,res) => {
    try {
       const data = await Room.find({
        users : {$in : [req.user]}
       }).populate('users','userName') 
       console.log(data[0].users)
       return res.status(200).send({data : data})
    } catch (error) {
        res.status(500).send({error : error})
    }
}

const getAllMessage = async(req,res) =>{
    console.log(req.params)
    try{
        const data = await Chat.find({roomId : req.params.id})
        return res.status(200).send({data : data})
    }
    catch(err){
        res.status(500).send({error : error})
    }
}

module.exports = {getRoom , getAllMessage}