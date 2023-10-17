const mongoose = require('mongoose')
const express = require('express')
const app = express()

//test engine pug
app.set('view engine', 'pug')
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))

//connection data base
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', { useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {console.log("MongoDB connected!")})
.catch((error) => {console.log('MongoDB connection error:', error)})

//Collection User
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model('User', userSchema)

app.get('/', async (req, res) => {
    try {
        const data = await User.find()
        console.log(data)
        res.render('index', {data})
    } catch (error) {
        console.log(error)
    }
})

app.post('/agregar', async (req, res) => {
    try {
        const {name, email, password} = req.body
        const newUser = new User({name, email, password})
        await newUser.save()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
















/*const newUser = new User({
    name: 'Sam Gammer',
    email: 'sam@example.com',
    password: '87654321'
})

newUser.save()
.then(() => {
    console.log('New user created!')
})
.catch((error) => {
    console.error('Error retrieving users: ', error)
})*/

/*User.find()
.then((users) => {
    console.log('All users: ', users)
})
.catch((error) => {
    console.error('Error retrieving users: ', error)
})*/






/*const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function(){
    console.log('MongoDb connected!')
})*/