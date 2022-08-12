const nodeMailer = require('nodemailer')

const { replace } = require("node-emoji");
const { MailTemplateTitle } = require("../../constants/mail");
const { CRYPTO_SECRET } = require("../../crypto/cryptoSecret");
const { EMAIL_DB_UTILS } = require("../../utils/dbUtils");
const { EMAIL_UTILS } = require("../../utils/emailUtils");

const EMAIL_SERVICES = {
    sendEmailVerification: async function (sendTo) {
        let replacerData = [];
        let emailTemplate = await EMAIL_UTILS.getByTitle(MailTemplateTitle.ACCOUNT_VERIFICATION, { title: 1, body: 1 })
        replacerData.push(sendTo.name)
        replace.push(...sendTo.token.split(""))

        let emailBody = EMAIL_UTILS.mailParser(emailTemplate.data.body, replacerData)
        await send
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