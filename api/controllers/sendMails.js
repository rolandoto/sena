const sendMailMethods = {}
const User = require("../models/User");
const Mail = require('../models/Mail');
const sendMail = require('../libs/Mail');
const permits = require("../config/emails");

async function getMailByType(type) {
    const mail = await Mail.findOne({
        notification: type
    })

    return mail;
}

sendMailMethods.newSolicity = async id => {
    const mail = await getMailByType('solicity');
    const instructor = await User.findById(id);

    const emailTemplate = {
        mails: mail.mails,
        subject: mail.subject,
        message: mail.message.replace('%{leader}' , instructor.first_name + " " + instructor.last_name),
    }
    sendMail(emailTemplate);
}

sendMailMethods.solicityStatusChange = async (id , statusDetail) => {
    const mail = await getMailByType('solicityStatus');
    const director = await User.findById(id);

    const emailTemplate = {
        mails: mail.mails,
        subject: mail.subject,
        message: mail.message.replace('%{status}' , statusDetail).replace('%{director}' , director.first_name + " " + director.last_name),
    }
    sendMail(emailTemplate);
}

sendMailMethods.createCitation = async (citationLink , name) => {
    const mail = await getMailByType('citation');

    const emailTemplate = {
        mails: mail.mails,
        subject: mail.subject,
        message: mail.message,
        archives: [
            {
                filename: name,
                path: citationLink
            }
        ]
    }
    sendMail(emailTemplate);
}

sendMailMethods.createMinutes = async (minuteLink , name) => {
    const mail = await getMailByType('lawyer');

    const emailTemplate = {
        mails: mail.mails,
        subject: mail.subject,
        message: mail.message,
        archives: [
            {
                filename: name,
                path: minuteLink
            }
        ]
    }
    sendMail(emailTemplate);
}

sendMailMethods.sendCitation = async (citation , otherEmails) => {
    const mail = await getMailByType('citationConfirm');

    const emailTemplate = {
        mails: mail.mails + "," + otherEmails,
        subject: mail.subject,
        message: mail.message,
        archives: [
            {
                filename: citation.name,
                path: citation.path
            }
        ]
    }

    if ( sendMail(emailTemplate)){
        return true;
    } else {
        return false;
    }
}

module.exports = sendMailMethods;