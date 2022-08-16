require('dotenv').config();
const nodeMailer = require('nodemailer')
const { replace } = require("node-emoji");
const { MailTemplateTitle, MailSubject } = require("../../constants/mail");
const { CRYPTO_SECRET } = require("../../crypto/cryptoSecret");
const { EMAIL_DB_UTILS } = require("../../utils/dbUtils");
const { EMAIL_UTILS } = require("../../utils/emailUtils");

const EMAIL_SERVICES = {
    sendOTPVerification: async function (userUpdated) {
        try {
            let response = await EMAIL_SERVICES.sendEmail(userUpdated, MailSubject.ACCOUNT_VERIFICATION, [])
            console.log("---------response-----------", response)
            return response;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    sendEmail: async function (userUpdated, subject, attachements) {
        try {
            const transporter = nodeMailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_AUTH_USER,
                    pass: process.env.EMAIL_AUTH_PASSWORD
                }
            })
            let response = await transporter.sendMail(
                {
                    from: process.env.EMAIL_AUTH_USER,
                    to: userUpdated.email,
                    subject: subject,
                    text: `This is the OTP for ${MailSubject.ACCOUNT_VERIFICATION}. Please dont share with others.`,
                    html: `
                    


                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8" />
                            <meta name="viewport" content="width=device-width" />
                            <title>replit</title>
                            <link href="style.css" rel="stylesheet" type="text/css" />
                            <link
                            href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
                            rel="stylesheet"
                            />
                            <style>
                            * {
                                margin: 0;
                                padding: 0;
                                font-family: "Ubuntu", sans-serif;
                                
                            }
                            </style>
                        </head>

                        <body>
                            <div
                            style="
                                height: 100vh;
                                box-shadow: 0px 0px 20px 1px rgba(153, 151, 151, 0.25),
                                0px 0px 20px 1px rgba(114, 112, 112, 0.22);
                                width: 100%;
                                margin: 0 auto;
                                border-radius: 1rem;
                            "
                            >
                            <div
                                style="
                                margin: 0 auto;
                                width: 100%;
                                background-color: #ffe2b4;
                                display: flex;
                                 flex-direction: column;
                                align-items: center;
                                justify-content: center;
                               
                                border-top-left-radius: 1rem;
                                border-top-right-radius: 1rem;
                                "
                            >
                                <div>
                                <img
                                src="https://res.cloudinary.com/dtjqyp0r2/image/upload/v1660643211/bkisv2kflru4pcnp5alk.png"
                                height="250px"
                                width="320px"
                                />
                                </div>
                                <div> <h2 style="color: #005459; font-size: 3rem; font-weight: 800">
                                Breeze
                                </h2></div>

                                <br />
                            </div>
                            <div
                                style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                                "
                            >
                                <br />
                                <img
                                style="border-radius: 0.5rem"
                                src="https://s-media-cache-ak0.pinimg.com/originals/97/56/c2/9756c2a05e2dd85309fe4b3bc5d62357.gif"
                                height="80px"
                                width="100px"
                                />
                                <br />
                                <label style="font-size: 2rem; font-weight: bold"
                                >[ OTP for Breeze ]
                                </label>
                                <br />
                                <hr
                                style="width: 50%; text-align: left; margin-left: 0; color: #005459"
                                />
                                <br />
                                <h2>Hi, ${userUpdated.name}</h2>
                                <br />
                                <p>Here is your verification code for activating your account.</p>
                                <br />
                                <h2 style="color: #005459; letter-spacing: 10px">${userUpdated.otp}</h2>
                                <br />
                                <br /><br />
                                <label style="color: grey; font-size: 0.9rem"
                                >* OTP will expire in 5 min.</label
                                >

                                <br />
                            </div>

                            <br />
                            <div
                                style="
                                margin-top: 10px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                                "
                            >
                                <br />
                                <h5 style="color: #005459; font-size: 1.2rem">@Breeze.io</h5>
                                <br />
                                <p style="color: grey">Copyright © 2022 || All rights reserved.</p>
                                <br />
                                <br />
                            </div>
                            </div>
                        </body>
                        </html>

                    `,

                }
            )
            console.log(response, '-----------Transporter response-------')
            return response;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    sendEmailVerification: async function (sendTo) {
        try {
            let replacerData = [];
            let emailTemplate = await EMAIL_UTILS.getByTitle(MailTemplateTitle.ACCOUNT_VERIFICATION, { title: 1, body: 1 })
            console.log("------EMAIL TEMPLATE------", emailTemplate)
            replacerData.push(sendTo.name)
            replacerData.push(sendTo.token)

            let emailBody = EMAIL_UTILS.mailParser(emailTemplate.data.body, replacerData)
            console.log("-----------EMAILBODY------", emailBody)
            let response = await EMAIL_SERVICES.sendMail(sendTo.email, MailSubject.ACCOUNT_VERIFICATION, emailBody, [])
            return response;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    sendMail: async function (to, subject, body, attachements) {
        let response;
        try {
            let emailInfo = await EMAIL_SERVICES.getTransportObject()
            let transporter = nodeMailer.createTransport(emailInfo.transport)

            let mailConfig = {
                from: emailInfo.from, // SENDER EMAIL ADDRESS
                to: to.toString(),    // RECEIVERS LIST
                subject: subject,
                html: body,
                attachements: attachements
            }

            let mailResponse = await transporter.sendMail(mailConfig, (err, info) => {
                if (error) {
                    new Error("Error SENDING MAIL" + error);
                    response = { success: false };
                    console.error(`Error Sending Mail : ${error}`.error);
                } else {
                    response = { success: true };
                    console.log(` ✔️  Mail Sent To :- ${to}`);

                }
            })
            return response;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    getTransportObject: async function () {
        try {
            let emailInfo = await EMAIL_DB_UTILS.findTitle('email_credentials', {})
            if (emailInfo) {
                let decryptedData = CRYPTO_SECRET.decrypt(emailInfo.data)
                return JSON.parse(decryptedData)
            }
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    }
}

module.exports = {
    EMAIL_SERVICES
}