const express = require("express");
const morgan = require('morgan');
const adminRouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoute");
const portfolioRouter = require("./routes/portfolioRoute");


const app=express();
app.use(express.json());

//dev middleware
if(process.env.NODE_ENV="development"){
	app.use(morgan('dev'));
};

//for making request without errors
//in official language called cors error handling
app.use((req,res,next) =>{
	//res.header("Access-Control-Allow-Credentials","true");
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,x-auth-token, Content-Type, Accept,Authorization,x-access-token");
	res.header("Access-Control-Allow-Methods","GET,OPTIONS,POST,PUT,PATCH,DELETE");
	next();
});

app.get('/',(req,res)=>{
  res.send("This is backend of TejTech By: TejPratap [RUNNING]");
});


//routing middlewares
app.use('/api/admin',adminRouter);
app.use('/api/users',userRouter);
app.use('/api/portfolio',portfolioRouter);




module.exports = app;