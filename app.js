const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const userRouter=require('./routes/userRoute');
const indexRouter=require('./routes/indexRoute');
const connectDB=require('./config/db.connection');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
connectDB();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',indexRouter);

app.use('/user',userRouter);

process.on('UncaughtException',(err)=>{
    console.log('Uncaught Exception');
    console.log(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`);
    
});