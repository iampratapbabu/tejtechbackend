

exports.demoMiddleware = (req,res,next) =>{
  console.log("middleware runs");
  next();
};


exports.getDashboard = (req,res)=>{
  res.send("GET this is dashboar route");
}





