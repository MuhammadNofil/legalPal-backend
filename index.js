const express = require('express')
const mongose = require('mongoose')
const app = express()
const socket = require('socket.io')

app.use(express.json())


// routes
const Authroutes = require('./routes/authRoutes')
const Cardroutes = require('./routes/cardRoute')
const Lawyerroute = require('./routes/lawyerRotes')
const Appointmentroutes = require('./routes/appointmentRoutes')
const UserRoutes = require('./routes/userRoute')


app.get('/',(req,res)=>{
    res.send('welcome to Legal Pal apis')
})

app.use('/auth', Authroutes)
app.use('/card', Cardroutes)
app.use('/lawyer', Lawyerroute)
app.use('/appointement', Appointmentroutes)
app.use('/user',UserRoutes )

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
// module.exports = io