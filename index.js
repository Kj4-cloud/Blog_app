const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');


const Blog = require('./model/blog');

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
app.use(express.static(path.resolve('./public')));


app.get('/', async (req, res) => {
    const allBlogs = await Blog.find().sort('createdBy').sort({ createdAt: -1 });
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    });
})

app.use('/user',userRouter);

app.use('/blog',blogRouter);


app.listen(PORT , () =>{
    console.log(`Server is running on port ${PORT}`);
})