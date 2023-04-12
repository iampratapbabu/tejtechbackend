
exports.errorResponse = (res, message, statusCode, error) => {
    console.log(message,error)
    res.status(statusCode).json({
      success: false,
      message:message+ "[SERVER ERROR]",
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