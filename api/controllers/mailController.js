const mailMethods = {};
const Mail = require("../models/Mail");
const permits = require("../config/emails");
require("dotenv").config();

mailMethods.getPermits = async (req, res) => {
    try {
        return res.status(200).json({
            status: true,
            types: permits,
            message: "Se han encontrado tipos de mail",
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Ha ocurrido un error, intentalo de nuevo",
        });
    }
};

mailMethods.getMail = async (req, res) => {
    const mailID = req.params["id"];
    if (mailID) {
        try {
            return res.status(200).json({
                status: true,
                mail: await Mail.findById(mailID),
                message: "Se ha encontrado el mail",
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Ha ocurrido un error, intentalo de nuevo",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "El id es requerido",
        });
    }
};

mailMethods.getAllMails = async (req, res) => {
    try {
        const mails = (await Mail.find()) || [];
        return res.status(200).json({
            status: true,
            mails: mails,
            message: "Se han encontrado emails",
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Ha ocurrido un error, intentalo de nuevo",
        });
    }
};

mailMethods.createMail = async (req, res) => {
    const { name, mails, message, subject, notification } = req.body;
    if (name && mails) {
        const mail = new Mail({
            notification,
            name,
            mails,
            message,
            subject,
        });

        if (await mail.save()) {
            return res.status(200).json({
                status: true,
                message: "Se ha creado correctamente el email",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Ha ocurrido un error por favor intentalo de nuevo",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "Todos los campos son requeridos",
        });
    }
};

mailMethods.updateMail = async (req, res) => {
    const { mailID, name, mails, message, subject, notification } = req.body;
    if (mailID) {
        try {
            const mail = await Mail.findById(mailID);
            const updated = await mail.updateOne({
                $set: {
                    name,
                    mails,
                    message,
                    subject,
                    notification,
                },
            });

            if (updated) {
                return res.status(200).json({
                    status: true,
                    message: "El mail fue actualizado correctamente",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Ha ocurrido un error intentalo nuevamente",
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error,
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "El id es requerido",
        });
    }
};

mailMethods.deleteMail = async (req, res) => {
    const { mailID } = req.body;

    if (mailID) {
        try {
            const removed = await Mail.findById(mailID);
            if (removed.remove()) {
                return res.status(200).json({
                    status: true,
                    message: "El mail fue eliminado correctamente",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Ha ocurrido un error intentalo nuevamente",
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error,
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "El id es requerido",
        });
    }
};

module.exports = mailMethods;
