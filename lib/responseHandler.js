exports.errorResponse = (res, message,error) => {
    console.log("ERROR HANDLER RUNS",message,error.httpCode)

    let msgbody = error && error.message ? error.message : message;
    let statusCode = error && error.httpCode?error.httpCode : 500
    if(statusCode == 500){
      msgbody = message + " [Internal Server Error]";
    }

    res.status(statusCode).json({
      statusCode,
      success: false,
      message:msgbody,
      resData:error,
    });
   
};


exports.successResponse = (res,message,resData) =>{
  res.status(200).json({
    statusCode:200,
    success: true,
    message,
    resData
  });
}