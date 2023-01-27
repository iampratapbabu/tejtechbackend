const fast2sms = require('fast-two-sms');

const sendSMS = async(req,res) =>{
    try{
        console.log("sms");
        let options = {authorization : process.env.SMS_API , message : 'Happy saraswati puja bhailog love from pratapbabu' ,  numbers : ['9137700478','8340696697','7998803166','6388217839','9305787616','9112571333','7734005351','8176891776','7290064789']} 
        const response = await fast2sms.sendMessage(options) //Asynchronous Function.
        console.log(response)
        res.send(response);
    }catch (err) {
        res.status(500).json({
            error: "manual error message",
            errormsg: err.message
        });
    }
}

module.exports={sendSMS}