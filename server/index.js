const express =require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const User = require('./models/User');
const AuthMiddlewares = require('./middlewares/AuthMiddlewares');
// const { protected }=require('./routes/routes')
mongoose.connect('mongodb+srv://hverma0511:m5RzB5jAvwMjzjYZ@mern.uyep6sx.mongodb.net/todo?retryWrites=true&w=majority&appName=mern')
.then(() => {
        console.log('Connected to the Database successfully');
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        })
    })
.catch((error) => {
        console.log('Error: ', error);
 })
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use('/api', require('./routes/routes'));
// app.use('/pri',AuthMiddlewares,require('./routes/routes') );

app.get('/', async (req, res) => {
        const user = await  Todo.find({})
        res.status(200).json({user: user})
    
});
 

