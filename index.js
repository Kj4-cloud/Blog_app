const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 8000;


app.set('view engine' , 'ejs');
app.set('views' ,path.resolve('./view'));

app.get('/', (req,res) =>{  
    res.render('home');
})

app.use('/user',userRouter);

app.listen(PORT , () =>{
    console.log(`Server is running on port ${PORT}`);
})