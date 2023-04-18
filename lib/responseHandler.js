
exports.errorResponse = (res, message, statusCode, error) => {
    console.log(message,error)
    let msgbody;
    if(statusCode == 500){
      msgbody = message+ " [SERVER ERROR]";
    }
    else{
      msgbody = message;
    }
    res.status(statusCode).json({
      success: false,
      message:msgbody,
      error
    });
   
};


exports.successResponse = (res,message,statusCode,success_res) =>{
  console.log("Success Handler Runs")
  res.status(statusCode).json({
    success: true,
    message,
    success_res
  });
}