const Otp = require('../models/otpModel');
const nodemailer = require('nodemailer');
const { errorResponse, successResponse } = require('../lib/responseHandler');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//mail transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});



const sendOTP = async (req, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const { email } = req.body;
    let existedOtp = await Otp.findOne({ email });
    if (!existedOtp) {
      let newOtp = new Otp({
        email,
        otp
      });
      await newOtp.save();
    } else {
      existedOtp.otp = otp;
      await existedOtp.save();
    }

    let mailOptions = {
      from: `${process.env.EMAIL_USERNAME}`,
      // to: user.email,
      to: email,
      subject: "OTP Verification",
      // text:`OTP for Your account verification is ${otp}`
      html: `<html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                  <title>OTP verification</title>
                
                </head>
                
                <body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
                  <center style="background-color:#E1E1E1;">
                    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTbl" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;">
                      <tr>
                        <td align="center" valign="top" id="bodyCell">
                
                          <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader">
                            <tr>
                              <td align="center" valign="top">
                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                    <td align="center" valign="top">
                
                                      <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer">
                                        <tr>
                                          <td valign="top" width="500" class="flexibleContainerCell">
                
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                              <tr>
                                                <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none;display:none !important;">
                                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                                                    <tr>
                                                      <td align="left" class="textContent">
                                                        <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;">
                                                          Here you can put short introduction of your email template.
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                
                                    </td>
                                  </tr>
                                </table>
                
                              </td>
                            </tr>
                          </table>
                
                          <table bgcolor="#F5F5F5" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody">
                
                            <tr>
                              <td align="center" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#DE4724">
                                  <tr>
                                    <td align="center" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                                        <tr>
                                          <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                            <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                              <tr>
                                                <td align="center" valign="top" class="textContent">
                                                  <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">TEJ TECH</h1>
                                                  <h2 style="text-align:center;font-weight:normal;font-family:Helvetica,Arial,sans-serif;font-size:23px;margin-bottom:10px;color:#C9BC20;line-height:135%;">EMAIL VERIFICATION</h2>
                                                  <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">Your account has been created on the TEJTECH</div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                    <td align="center" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                                        <tr>
                                          <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                            <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                              <tr>
                                                <td align="center" valign="top">
                
                                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                      <td valign="top" class="textContent">
                                                        <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">OTP <b>${otp}</b></h3>
                                                        <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">Please Enter the OTP to verify your account</div>
                                                      </td>
                                                    </tr>
                                                  </table>
                
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                
                            <tr>
                              <td align="center" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8">
                                  <tr>
                                    <td align="center" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                                        <tr>
                                          <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                            <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                              <tr>
                                                <td align="center" valign="top">
                                                  <table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color:#DE4724;">
                                                    <tr>
                                                      <td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;">
                                                        <a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:135%;" href="{{link}}" target="_blank">LOGIN</a>
                                                      </td>
                                                    </tr>
                                                  </table>
                
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                
                          </table>
                
                          <!-- footer -->
                          <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailFooter">
                            <tr>
                              <td align="center" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                    <td align="center" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                                        <tr>
                                          <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                            <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                              <tr>
                                                <td valign="top" bgcolor="#E1E1E1">
                
                                                  <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;">
                                                    <div>Copyright &#169; 2022. All rights reserved.</div>
                                                    <div>If you don't want to receive these emails from us in the future, please <a href="#" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">unsubscribe</span></a></div>
                                                  </div>
                
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!-- // end of footer -->
                
                        </td>
                      </tr>
                    </table>
                  </center>
                </body>
                </html>`
    }
    transporter.sendMail(mailOptions, (error, email_res) => {
      if (error) { errorResponse(res, 'Error sending mail', error); }
      else {
        console.log("Email sent to", email_res)
        return successResponse(res, 'Email sent successfully', email_res);
      }
    })

  } catch (err) {
    errorResponse(res, 'sendOTP', 500, err);
  }
}

const verifyOTP = async (req, res) => {
  try {
    const { type, email, otp } = req.body;
    if(type == "resend"){
      sendOTP(req,res);
    }else{
    let existedOtp = await Otp.findOne({email});
    if(!existedOtp){errorResponse(res, 'no otp sent to this mail', "failed");}
    if (existedOtp.otp == otp) {

      return successResponse(res, 'Otp verified', "email verified");

      let mailOptions = {
        from: `${process.env.EMAIL_USERNAME}`,
        to: email,
        subject: "Account Verified",
        // text:`OTP for Your account verification is ${otp}`
        html: `Your account is successfully <b>verified</b>`
      }
      transporter.sendMail(mailOptions, (error, email_res) => {
        if (error) { errorResponse(res, 'otp verified but Error sending mail', 400, error); }
        else {
          // console.log("Email sent to", email_res)
          return successResponse(res, 'Otp verified', email_res);
        }
      })
    } else {
      errorResponse(res, 'Otp verification failed', 400, "otp not matches");
    }
    }



  } catch (err) {
    errorResponse(res, 'verify OTP', 500, err);
  }
}

module.exports = { sendOTP, verifyOTP }
