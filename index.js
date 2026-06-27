const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');


//connect to mongodb
mongoose.connect('mongodb://localhost:27017/blogging_app')
.then(() => {
    console.log('Connected to MongoDB');
}           )
.catch((err) => {
    console.log('Error connecting to MongoDB:', err);
}   );  

const app = express();

const PORT = process.env.PORT || 8000;


app.set('view engine' , 'ejs');
app.set('views' ,path.resolve('./view'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.get('/', (req,res) =>{  
    res.render('home', {
        user: req.user,
    });
})

app.use('/user',userRouter);

app.listen(PORT , () =>{
    console.log(`Server is running on port ${PORT}`);
})