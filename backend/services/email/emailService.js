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
            return response;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    sendEmail: async function (userUpdated, subject, attachements) {
        try {
            let testAccount = nodeMailer.createTestAccount();

            // const transporter = nodeMailer.createTransport({
            //     service: process.env.EMAIL_SERVICE,
            //     auth: {
            //         user: process.env.EMAIL_AUTH_USER,
            //         pass: process.env.EMAIL_AUTH_PASSWORD
            //     }
            // })

            const transporter = nodeMailer.createTransport({
                host: "smtp.Ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            })

            let response = await transporter.sendMail(
                {
                    from: process.env.EMAIL_AUTH_USER,
                    to: userUpdated.email,
                    subject: subject,
                    text: `This is the OTP for ${MailSubject.ACCOUNT_VERIFICATION}. Please dont share with others.`,
                    html: `<b>This is the OTP. <br/> ${userUpdated.otp}.</b>`
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