const fast2sms = require('fast-two-sms');

const sendSMS = async(req,res) =>{
    try{
        console.log("sms");
        let options = {authorization : process.env.SMS_API , message : 'Hello this is a new sms' ,  numbers : ['9886850164','8340696697']} 
        const response = await fast2sms.sendMessage(options) //Asynchronous Function. 
        console.log(response);
        res.send(response);
    }catch (err) {
        res.status(500).json({
            error: "manual error message",
            errormsg: err.message
        });
    }
}

module.exports={sendSMS}