const express = require("express");
const morgan = require('morgan');
const axios  = require('axios');

//routes
const myRouter = require("./routes/myRoute");
const courseRouter = require("./routes/courseRoute");
const blogsRouter = require("./routes/blogRoute");
const userRouter = require("./routes/userRoute")

const app=express();
app.use(express.json());

//MIDDLEWARES
if(process.env.NODE_ENV="development"){
	app.use(morgan('dev'));
};

//for making request without error with react
//in official language called cors error handling
app.use((req,res,next) =>{
	//res.header("Access-Control-Allow-Credentials","true");
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,x-auth-token, Content-Type, Accept,Authorization");
	res.header("Access-Control-Allow-Methods","GET,OPTIONS,POST,PUT,PATCH,DELETE");
	next();
});

app.get('/',(req,res)=>{
  res.send("This is backend of TejTech By: TejPratap");
});

//all route files
//app.use('/test',myRouter);
app.use('/user',myRouter);


const myfunction = (req,res) =>{
	res.status(200).json({"msg":"hello form the test route"});
}

app.get('/test',async(req,res,next)=>{
	//res.send("test route runs")
	
	myfunction(req,res);
	await axios.get('https://jsonplaceholder.typicode.com/users',{headers:{ "Accept-Encoding": "gzip,deflate,compress" }})
	.then((res)=>{
		console.log(res.data);
	})
	.catch(err=>{
		console.log(err);
	})
})

app.use('/api/courses',courseRouter);
app.use('/api/blogs',blogsRouter);
app.use('/api/users',userRouter);
app.use('/api/myroute',myRouter);



module.exports = app;
