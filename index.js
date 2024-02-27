const express = require('express')
const mongose = require('mongoose')
const app = express()
const socket = require('socket.io')
const Chat = require('./models/chatModel.js')
require('dotenv').config()
app.use(express.json())


// routes
const Authroutes = require('./routes/authRoutes')
const Cardroutes = require('./routes/cardRoute')
const Lawyerroute = require('./routes/lawyerRotes')
const Appointmentroutes = require('./routes/appointmentRoutes')
const UserRoutes = require('./routes/userRoute')
const ChatRoutes = require('./routes/chatRoute')
const NotificationRoute = require('./routes/notificationRoutes.js')
const ReviewRouter = require('./routes/reviewRouter.js')


app.get('/', (req, res) => {
    res.send('welcome to Legal Pal apis')
})


app.use('/auth', Authroutes)
app.use('/card', Cardroutes)
app.use('/lawyer', Lawyerroute)
app.use('/appointement', Appointmentroutes)
app.use('/user', UserRoutes)
app.use('/chats', ChatRoutes)
app.use('/notification', NotificationRoute)
app.use('/review', ReviewRouter)

// database connection
mongose.connect('mongodb+srv://nofilsaleem:UMYqlY0gVDTlX22U@cluster0.r6mmshd.mongodb.net')
    .then(() => console.log('database is connected '))
    .catch((err) => console.log(err))

// server connection
const server = require('http').createServer(app);
server.listen(3015, () => {
    console.log('server is listening on port 3015')
})

const io = socket(server)
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('join', (data) => {
        socket.join(data?.id)
    })
    socket.on('msg', async function (msg) {
        console.log(msg);
        io.emit('chat message', msg);
        try {
            const chatMessage = await Chat.create({
                to: msg.to,
                from: msg.froom,
                text: msg.text,
                roomId: msg.roomId
            });
            console.log("Chat message saved:", chatMessage);
        } catch (error) {
            console.error("Error saving chat message:", error);
        }
    });

});
// module.exports = io