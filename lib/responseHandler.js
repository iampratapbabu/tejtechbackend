
exports.errorResponse = (res, message, statusCode, error) => {
    console.log("ERROR HANDLER RUNS",message,error)
    let msgbody;
    if(statusCode == 500){
      msgbody = message + " [SERVER ERROR]";
    }

    res.status(statusCode).json({
      statusCode,
      success: false,
      message:error?.message?error.message : message,
      resData:error,
    });
   
};


exports.successResponse = (res,message,statusCode,resData) =>{
  res.status(statusCode).json({
    statusCode,
    success: true,
    message,
    resData
  });
}